import { useQuery } from '@tanstack/react-query';
import { THAT_USERS_ALGORITHM } from '../member/memberQueryKey';
import { fetchThatUsersAlgorithm } from '../member/memberQueryFns';
import { Tables } from '@/type/database';

export const useFetchThatUsersAlgorithm = (thatUser: string | undefined) => {
  const { data: algorithmData, isLoading: algorithmIsLoading } = useQuery<Tables<'algorithm'>[]>({
    queryKey: [THAT_USERS_ALGORITHM, thatUser],
    queryFn: () => fetchThatUsersAlgorithm(thatUser),
    enabled: !!thatUser
  });

  return { algorithmData, algorithmIsLoading };
};
