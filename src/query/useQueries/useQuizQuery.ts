import { FETCHMORENUM } from '@/constants/quizConstants';
import { fetchQuizLike, fetchQuizList, fetchThisCreatorsQuiz } from '@/query/quiz/quizQueryFns';
import { QUIZLIKE_QUERY_KEY, QUIZLIST_QUERY_KEY, THE_QUIZ_OF_THIS_CREATOR } from '@/query/quiz/quizQueryKeys';
import { Tables } from '@/type/database';
import { QuizLikeList } from '@/type/quizType';
import { useInfiniteQuery, useQuery, useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
import { QUIZ_CREATOR_QUERY_KEY } from '../auth/authQueryKeys';
import { fetchQuizCreator } from '../auth/authQueryFns';
import { useCallback, useMemo } from 'react';

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

export const useCreatorNQuiz = (creator: string) => {
  const { data } = useSuspenseQueries({
    queries: [
      {
        queryKey: [QUIZ_CREATOR_QUERY_KEY],
        queryFn: () => fetchQuizCreator(creator)
      },
      { queryKey: [THE_QUIZ_OF_THIS_CREATOR], queryFn: () => fetchThisCreatorsQuiz(creator) }
    ],
    combine: useCallback((results: any) => {
      return {
        data: results.map((result: any) => result.data) as [Tables<'users'>, Tables<'quiz'>[]]
      };
    }, [])
  });

  // const mappedResults = results.map((result) => result.data);

  // const memoData = useMemo(() => {
  //   const convertView = () => mappedResults;
  //   return convertView();
  // }, [mappedResults]);

  // return memoData;
  return { data };
};
