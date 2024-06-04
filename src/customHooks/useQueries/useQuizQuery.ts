import { FETCHMORENUM } from '@/constants/quizConstants';
import { fetchQuizList } from '@/query/quizQueryFns';
import { QUIZLIST_QUERY_KEY } from '@/query/quizQueryKeys';
import { Tables } from '@/type/database';
import { useInfiniteQuery, useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';

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
    getNextPageParam: (lastPage: any, lastPageParam, allPages: any) => {
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
