import { useQuery } from '@tanstack/react-query';
import { THAT_USERS_ALGORITHM, THAT_USERS_GUESTBOOK } from '../member/memberQueryKey';
import { fetchThatUsersAlgorithm, fetchThatUsersGuestbook } from '../member/memberQueryFns';
import { Tables } from '@/type/database';

export const useFetchThatUsersAlgorithm = (thatUser: string | undefined) => {
  const { data: algorithmData, isLoading: algorithmIsLoading } = useQuery<Tables<'algorithm'>[]>({
    queryKey: [THAT_USERS_ALGORITHM, thatUser],
    queryFn: () => fetchThatUsersAlgorithm(thatUser),
    enabled: !!thatUser
  });

  return { algorithmData, algorithmIsLoading };
};

export const useFetchGuestBook = (thatUser: string | undefined) => {
  const { data: guestbookData, isLoading: guestbookLoading } = useQuery<Tables<'guestbook'>[]>({
    queryKey: [THAT_USERS_GUESTBOOK, thatUser],
    queryFn: () => fetchThatUsersGuestbook(thatUser),
    enabled: !!thatUser
  });

  return { guestbookData, guestbookLoading };
};
