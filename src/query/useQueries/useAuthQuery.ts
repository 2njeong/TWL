import { fetchCurrentUser } from '@/query/auth/authQueryFns';
import { CURRENT_USER_QUERY_KEY } from '@/query/auth/authQueryKeys';
import { Tables } from '@/type/database';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useFetchCurrentUser = () => {
  const queryClient = useQueryClient();
  const hasUserData = queryClient.getQueryData([CURRENT_USER_QUERY_KEY]);

  const { data: userData, isLoading } = useQuery<Tables<'users'>>({
    queryKey: [CURRENT_USER_QUERY_KEY],
    queryFn: fetchCurrentUser,
    select: (data) => data as Tables<'users'>,
    retry: !!hasUserData ? 3 : 1
  });

  const isLoggedIn = !isLoading && userData ? true : false;

  return { isLoggedIn, userData, isLoading };
};
