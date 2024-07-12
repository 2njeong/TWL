import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { THAT_USERS_ALGORITHM, THAT_USERS_GUESTBOOK } from '../member/memberQueryKey';
import { fetchThatUsersAlgorithm, fetchThatUsersGuestbook } from '../member/memberQueryFns';
import { Tables } from '@/type/database';
import { useEffect } from 'react';
import { NUMOFFETCHMOREALGORITHM, NUMOFFETCHMOREGUESTBOOK } from '@/constants/memberConstants';
import { useAtom } from 'jotai';
import { totalPageAtom } from '@/atom/memberAtom';

export const useFetchThatUsersAlgorithm = (thatUser: string | undefined) => {
  const {
    data: algorithmData,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isRefetching,
    isLoading: algorithmIsLoading
  } = useInfiniteQuery({
    queryKey: [THAT_USERS_ALGORITHM, thatUser],
    queryFn: ({ pageParam = 1 }) => fetchThatUsersAlgorithm({ pageParam, thatUser }),
    enabled: !!thatUser,
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, _, allPages: any) => {
      if (lastPage.length >= NUMOFFETCHMOREALGORITHM) {
        return allPages + 1;
      }
    },
    select: (data) => data.pages.map((page) => page).flat() as Tables<'algorithm'>[]
  });
  return {
    algorithmData,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isRefetching,
    algorithmIsLoading
  };
};

export const useFetchGuestBook = (thatUser: string | undefined, newPage: number) => {
  const [totalPage, setTotalPage] = useAtom(totalPageAtom);
  const queryClient = useQueryClient();

  const { data: guestbookData, isLoading: guestbookLoading } = useQuery<Tables<'guestbook'>[]>({
    queryKey: [THAT_USERS_GUESTBOOK, thatUser, newPage],
    queryFn: () => fetchThatUsersGuestbook(thatUser, newPage),
    enabled: !!thatUser
  });

  useEffect(() => {
    const hasMoreData = guestbookData && guestbookData.length >= NUMOFFETCHMOREGUESTBOOK;
    const nextPageData = queryClient.getQueryData<Tables<'guestbook'>[]>([THAT_USERS_GUESTBOOK, thatUser, newPage + 1]);
    if (hasMoreData) {
      if (nextPageData && nextPageData.length < 1) {
        setTotalPage(newPage);
      } else {
        setTotalPage((prev) => Math.max(prev, newPage + 1));
      }
    } else {
      setTotalPage((prev) => Math.max(prev, newPage));
    }
  }, [guestbookData, newPage, queryClient, thatUser]);

  return { guestbookData, guestbookLoading, totalPage };
};
