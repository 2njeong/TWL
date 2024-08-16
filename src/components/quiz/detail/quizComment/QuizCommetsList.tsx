'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useQuizCommentsQuery } from '@/query/useQueries/useQuizQuery';
import { Tables } from '@/type/database';
import SingleComment from './SingleComment';
import { clientSupabase } from '@/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { QUIZ_COMMENTS_QUERY_KEY } from '@/query/quiz/quizQueryKeys';

const QuizCommentsList = ({ theQuiz }: { theQuiz: Tables<'quiz'> | undefined }) => {
  const queryClient = useQueryClient();
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
  } = useQuizCommentsQuery(theQuiz?.quiz_id as string);
  const targetRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    const viewportHeight = window.innerHeight;

    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      const targetTop = rect.top + scrollPosition;
      const targetPosition = targetTop + rect.height * 0.5;
      if (targetPosition <= scrollPosition + viewportHeight) {
        if (!hasNextPage || isFetchingNextPage) return;
        fetchNextPage();
      }
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    const channel = clientSupabase
      .channel('insertQuizComments')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'comments' }, (payload) => {
        queryClient.invalidateQueries({
          queryKey: [QUIZ_COMMENTS_QUERY_KEY, theQuiz?.quiz_id]
        });
      })
      .subscribe();
    return () => {
      clientSupabase.removeChannel(channel);
    };
  }, [queryClient, theQuiz?.quiz_id]);

  if (isLoading) return <div>댓글 로딩중..</div>;
  return (
    <>
      <section className="flex flex-col gap-2 w-full">
        {quizComments?.filter((comment) => !comment.isDeleted).length ? (
          quizComments?.map(
            (comment) =>
              !comment.isDeleted && (
                <div key={comment.comment_id} className="w-full h-full">
                  <SingleComment comment={comment} quiz_id={theQuiz?.quiz_id} />
                </div>
              )
          )
        ) : (
          <div className="w-full h-20 flex justify-center items-center ">
            <p className="text-gray-500">아직 댓글이 없습니다.</p>
          </div>
        )}
      </section>
      <div ref={targetRef} className="w-96 h-28 flex justify-center items-center">
        {isFetchingNextPage && <p>로딩중...</p>}
      </div>
    </>
  );
};

export default QuizCommentsList;
