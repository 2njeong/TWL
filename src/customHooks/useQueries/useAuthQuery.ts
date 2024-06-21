import { fetchCurrentUser } from '@/query/auth/authQueryFns';
import { CURRENT_USER_QUERY_KEY } from '@/query/auth/authQueryKeys';
import { useQuery } from '@tanstack/react-query';

export const useFetchCurrentUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: [CURRENT_USER_QUERY_KEY],
    queryFn: fetchCurrentUser
  });

  const isLoggedIn = !isLoading && data ? true : false;

  return { isLoggedIn, data };
};
