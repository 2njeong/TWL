import { FETCHMORENUM } from '@/constants/quizConstants';
import { fetchQuizLike, fetchQuizList } from '@/query/quiz/quizQueryFns';
import { QUIZLIKE_QUERY_KEY, QUIZLIST_QUERY_KEY } from '@/query/quiz/quizQueryKeys';
import { Tables } from '@/type/database';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const useQuizListQuery = () => {
  const {
    data: quizList,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isRefetching
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
    isRefetching
  };
};

export const useQuizLike = () => {
  const { data } = useQuery({
    queryKey: [QUIZLIKE_QUERY_KEY],
    queryFn: fetchQuizLike
  });

  return { data };
};
