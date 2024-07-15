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
    select: (data) => (data.length > NUM_OF_FETCHMOREGUESTBOOK ? data.slice(0, -1) : data),
    enabled: !!thatUser
  });

  useEffect(() => {
    const currentPageData = queryClient.getQueryData<ExtendedGuestBook[]>([GUESTBOOK_OF_THATUSER, thatUser, newPage]);
    const hasMoreData = currentPageData && currentPageData.length > NUM_OF_FETCHMOREGUESTBOOK;
    const nextPageData = queryClient.getQueryData<ExtendedGuestBook[]>([GUESTBOOK_OF_THATUSER, thatUser, newPage + 1]);

    // console.log('currentPageData =>', currentPageData);
    // console.log('nextPageData =>', nextPageData);
    // console.log('hasMoreData =>', hasMoreData);
    if (nextPageData) {
      if (nextPageData.length > 0) {
        if (hasMoreData) {
          // console.log('0번 케이스');
          setTotalPage((prev) => Math.max(prev, newPage));
        } else {
          // console.log('0.5번 케이스');
          setTotalPage((prev) => prev - 1);
          queryClient.removeQueries({ queryKey: [GUESTBOOK_OF_THATUSER, thatUser, newPage + 1] });
        }
      } else {
        // console.log('1번 케이스');
        setTotalPage((prev) => Math.max(prev, newPage));
        queryClient.removeQueries({ queryKey: [GUESTBOOK_OF_THATUSER, thatUser, newPage + 1] });
      }
    } else {
      if (hasMoreData) {
        // console.log('2번 케이스');
        setTotalPage((prev) => Math.max(prev, newPage + 1));
      } else if (currentPageData && currentPageData?.length < 1) {
        // console.log('3번 케이스');
        setTotalPage(newPage - 1);
      } else {
        // console.log('4번 케이스');
        setTotalPage(newPage);
      }
    }
  }, [guestbookData, newPage, queryClient, thatUser]);

  return { guestbookData, guestbookLoading, totalPage };
};
