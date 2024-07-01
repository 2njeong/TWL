import { FETCHMORECOMMENTS, FETCHMOREQUIZLIST } from '@/constants/quizConstants';
import {
  fetchQueryComments,
  fetchQuizLike,
  fetchQuizList,
  fetchThisCreatorsQuiz,
  fetchthatQuiz
} from '@/query/quiz/quizQueryFns';
import {
  QUIZLIKE_QUERY_KEY,
  QUIZLIST_QUERY_KEY,
  QUIZ_COMMENTS_QUERY_KEY,
  THAT_QUIZ_QUERY_KEY,
  THE_QUIZ_OF_THIS_CREATOR
} from '@/query/quiz/quizQueryKeys';
import { Tables } from '@/type/database';
import { QuizLikeList } from '@/type/quizType';
import { useInfiniteQuery, useQuery, useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
import { QUIZ_CREATOR_QUERY_KEY } from '../auth/authQueryKeys';
import { fetchQuizCreator } from '../auth/authQueryFns';
import { useCallback } from 'react';

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
      if (lastPage.length >= FETCHMOREQUIZLIST) {
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

export const useFetchThatQuiz = (quiz_id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [THAT_QUIZ_QUERY_KEY, quiz_id],
    queryFn: () => fetchthatQuiz(quiz_id),
    enabled: !!quiz_id
  });
  return { data, isLoading };
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

export const useQuizCommentsQuery = () => {
  const {
    data: quizComments,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isRefetching,
    isLoading
  } = useInfiniteQuery({
    queryKey: [QUIZ_COMMENTS_QUERY_KEY],
    queryFn: fetchQueryComments,
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, _, allPages: any) => {
      // lastPage: 캐시데이터 내 pages[0] 중 가장 최근에 가지고 온 page의 item 갯수
      // allPages: 캐시데이터의 pages의 갯수
      if (lastPage.length >= FETCHMORECOMMENTS) {
        return allPages + 1;
      }
    },
    // 이렇게 해서 get한 NextPageParam이 undefined가 아니면 hasNextPage가 true가 되고,
    // 새로운 NextPageParam은 hook memory 안에 pageParam: xx 로 할당되어서 장전해놨다가
    // fetchNextPage가 호출이 되면 queryfn의 인자 ({pageParam = xx}) => response로 들어가서 데이터를 받아오게 되고
    // 받아온 데이터는 캐시 데이터의 pages 안에 요소로 들어가고, xx는 캐시데이터의 pageParams 배열에 들어감
    select: (data) => data.pages.map((page) => page).flat() as Tables<'comments'>[]
  });
  return {
    data: quizComments,
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
