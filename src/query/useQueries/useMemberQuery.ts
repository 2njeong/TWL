import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { ALGORITHM_OF_THATUSER, GUESTBOOK_OF_THATUSER, QUIZLIST_OF_THATUSER } from '../member/memberQueryKey';
import { fetchThatUsersAlgorithm, fetchThatUsersGuestbook, fetchThatUsersQuizList } from '../member/memberQueryFns';
import { Tables } from '@/type/database';
import { useEffect } from 'react';
import {
  NUM_OF_FETCHMOREALGORITHM,
  NUM_OF_FETCHMOREGUESTBOOK,
  NUM_OF_FETCHMOREQUIZLISTOFTHATUSER
} from '@/constants/memberConstants';
import { useAtom } from 'jotai';
import { totalPageAtom } from '@/atom/memberAtom';
import { ExtendedGuestBook, QuizListOfThatUser } from '@/type/memberType';

export const useFetchQuizlistOfThatUser = (thatUser: string | undefined) => {
  const {
    data: quizListOfThatUser,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isRefetching,
    isLoading: quizListOfThatUserLoading
  } = useInfiniteQuery({
    queryKey: [QUIZLIST_OF_THATUSER, thatUser],
    queryFn: ({ pageParam = 1 }) => fetchThatUsersQuizList({ pageParam, thatUser }),
    enabled: !!thatUser,
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, _, allPages: any) => {
      if (lastPage.length >= NUM_OF_FETCHMOREQUIZLISTOFTHATUSER) {
        return allPages + 1;
      }
    },
    select: (data) => data.pages.map((page) => page).flat() as QuizListOfThatUser[]
  });

  return {
    quizListOfThatUser,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isRefetching,
    quizListOfThatUserLoading
  };
};

export const useFetchThatUsersAlgorithm = (thatUser: string | undefined) => {
  const {
    data: algorithmData,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isRefetching,
    isLoading: algorithmIsLoading
  } = useInfiniteQuery({
    queryKey: [ALGORITHM_OF_THATUSER, thatUser],
    queryFn: ({ pageParam = 1 }) => fetchThatUsersAlgorithm({ pageParam, thatUser }),
    enabled: !!thatUser,
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, _, allPages: any) => {
      if (lastPage.length >= NUM_OF_FETCHMOREALGORITHM) {
        return allPages + 1;
      }
    },
    select: (data) => data.pages.map((page) => page).flat() as Tables<'algorithm'>[]
  });
  return {
    algorithmData,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isRefetching,
    algorithmIsLoading
  };
};

export const useFetchGuestBook = (thatUser: string | undefined, newPage: number) => {
  const [totalPage, setTotalPage] = useAtom(totalPageAtom);
  const queryClient = useQueryClient();

  const { data: guestbookData, isLoading: guestbookLoading } = useQuery<ExtendedGuestBook[]>({
    queryKey: [GUESTBOOK_OF_THATUSER, thatUser, newPage],
    queryFn: () => fetchThatUsersGuestbook(thatUser, newPage),
    enabled: !!thatUser
  });

  useEffect(() => {
    const hasMoreData = guestbookData && guestbookData.length >= NUM_OF_FETCHMOREGUESTBOOK;
    const nextPageData = queryClient.getQueryData<Tables<'guestbook'>[]>([
      GUESTBOOK_OF_THATUSER,
      thatUser,
      newPage + 1
    ]);
    if (hasMoreData) {
      if (nextPageData && nextPageData.length < 1) {
        setTotalPage(newPage);
      } else {
        setTotalPage((prev) => Math.max(prev, newPage + 1));
      }
    } else {
      setTotalPage((prev) => Math.max(prev, newPage));
    }
  }, [guestbookData, newPage, queryClient, thatUser]);

  return { guestbookData, guestbookLoading, totalPage };
};
