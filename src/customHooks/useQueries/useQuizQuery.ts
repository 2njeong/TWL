import { FETCHMORENUM } from '@/constants/quizConstants';
import { fetchQuizLike, fetchQuizList } from '@/query/quiz/quizQueryFns';
import { QUIZLIKE_QUERY_KEY, QUIZLIST_QUERY_KEY } from '@/query/quiz/quizQueryKeys';
import { Tables } from '@/type/database';
import { QuizLikeList } from '@/type/quizType';
import { useInfiniteQuery, useQuery, useSuspenseQuery } from '@tanstack/react-query';

export const useQuizListQuery = () => {
  const {
    data: quizList,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isRefetching,
    isLoading
  } = useInfiniteQuery({
    queryKey: [QUIZLIST_QUERY_KEY],
    queryFn: fetchQuizList,
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, _, allPages: any) => {
      if (lastPage.length >= FETCHMORENUM) {
        return allPages + 1;
      }
    },
    select: (data) => data.pages.map((p) => p).flat() as Tables<'quiz'>[]
  });
  return {
    data: quizList,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isRefetching,
    isLoading
  };
};

export const useQuizLike = (quiz_id: string) => {
  const { data } = useSuspenseQuery<QuizLikeList>({
    queryKey: [QUIZLIKE_QUERY_KEY],
    queryFn: () => fetchQuizLike(quiz_id)
  });
  return { data };
};
