import { useQuery, useQueryClient } from '@tanstack/react-query';
import { THAT_USERS_ALGORITHM, THAT_USERS_GUESTBOOK } from '../member/memberQueryKey';
import { fetchThatUsersAlgorithm, fetchThatUsersGuestbook } from '../member/memberQueryFns';
import { Tables } from '@/type/database';
import { useEffect, useState } from 'react';
import { NUMOFFETCHMOREGUESTBOOK } from '@/constants/memberConstants';
import { useAtom } from 'jotai';
import { pageAtom } from '@/atom/memberAtom';

export const useFetchThatUsersAlgorithm = (thatUser: string | undefined) => {
  const { data: algorithmData, isLoading: algorithmIsLoading } = useQuery<Tables<'algorithm'>[]>({
    queryKey: [THAT_USERS_ALGORITHM, thatUser],
    queryFn: () => fetchThatUsersAlgorithm(thatUser),
    enabled: !!thatUser
  });
  return { algorithmData, algorithmIsLoading };
};

export const useFetchGuestBook = (thatUser: string | undefined, newPage: number) => {
  const [page, _] = useAtom(pageAtom);
  const [totalPage, setTotalPage] = useState(1);
  const queryClient = useQueryClient();

  const { data: guestbookData, isLoading: guestbookLoading } = useQuery<Tables<'guestbook'>[]>({
    queryKey: [THAT_USERS_GUESTBOOK, thatUser, newPage],
    queryFn: () => fetchThatUsersGuestbook(thatUser, newPage),
    enabled: !!thatUser
  });

  useEffect(() => {
    const hasMoreData = guestbookData && guestbookData.length >= NUMOFFETCHMOREGUESTBOOK;
    const nextPageData = queryClient.getQueryData<Tables<'guestbook'>[]>([THAT_USERS_GUESTBOOK, thatUser, page + 1]);
    if (hasMoreData) {
      if (nextPageData && nextPageData.length < 1) {
        setTotalPage(page);
      } else {
        setTotalPage((prev) => Math.max(prev, page + 1));
      }
    } else {
      setTotalPage((prev) => Math.max(prev, page));
    }
  }, [guestbookData, page, queryClient, thatUser]);

  return { guestbookData, guestbookLoading, totalPage };
};
