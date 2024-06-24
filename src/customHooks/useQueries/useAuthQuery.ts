import { fetchCurrentUser, fetchQuizCreator } from '@/query/auth/authQueryFns';
import { CURRENT_USER_QUERY_KEY, QUIZ_CREATOR_QUERY_KEY } from '@/query/auth/authQueryKeys';
import { Tables } from '@/type/database';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

export const useFetchCurrentUser = () => {
  const { data: userData, isLoading } = useQuery<Tables<'users'>>({
    queryKey: [CURRENT_USER_QUERY_KEY],
    queryFn: fetchCurrentUser,
    select: (data) => data as Tables<'users'>
  });

  const isLoggedIn = !isLoading && userData ? true : false;

  return { isLoggedIn, userData, isLoading };
};

export const useFetchQuizCreator = (creator: string) => {
  const { data: creatorData } = useSuspenseQuery({
    queryKey: [QUIZ_CREATOR_QUERY_KEY],
    queryFn: () => fetchQuizCreator(creator)
  });
  return { creatorData };
};
