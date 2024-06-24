import { fetchCurrentUser } from '@/query/auth/authQueryFns';
import { CURRENT_USER_QUERY_KEY } from '@/query/auth/authQueryKeys';
import { Tables } from '@/type/database';
import { useQuery } from '@tanstack/react-query';

export const useFetchCurrentUser = () => {
  const { data, isLoading } = useQuery<Tables<'users'>>({
    queryKey: [CURRENT_USER_QUERY_KEY],
    queryFn: fetchCurrentUser,
    select: (data) => data as Tables<'users'>
  });

  const isLoggedIn = !isLoading && data ? true : false;

  return { isLoggedIn, data, isLoading };
};
