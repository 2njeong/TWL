import { fetchCurrentUser } from '@/query/auth/authQueryFns';
import { CURRENT_USER_QUERY_KEY } from '@/query/auth/authQueryKeys';
import { Tables } from '@/type/database';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useFetchCurrentUser = () => {
  const queryClient = useQueryClient();
  const isUserData = queryClient.getQueryData([CURRENT_USER_QUERY_KEY]);
  console.log('isUserData =>', isUserData);
  console.log('!!isUserData =>', !!isUserData);

  const { data: userData, isLoading } = useQuery<Tables<'users'>>({
    queryKey: [CURRENT_USER_QUERY_KEY],
    queryFn: fetchCurrentUser,
    select: (data) => data as Tables<'users'>,
    retry: !!isUserData ? 3 : 1
  });
  console.log('userData =>', userData);

  const isLoggedIn = !isLoading && userData ? true : false;

  return { isLoggedIn, userData, isLoading };
};
