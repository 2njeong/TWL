'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useQuizCommentsQuery } from '@/query/useQueries/useQuizQuery';
import { getHoursDifference } from '@/utils/utilFns';
import QuizCommentsDeleteBtn from './QuizCommentsDeleteBtn';
import { Tables } from '@/type/database';

const QuizCommentsList = ({ theQuiz }: { theQuiz: Tables<'quiz'> | undefined }) => {
  const {
    data: quizComments,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isRefetching
  } = useQuizCommentsQuery(theQuiz?.quiz_id as string);
  const targetRef = useRef<HTMLDivElement | null>(null);

  // console.log('quizComments =>', quizComments);

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

  return (
    <>
      <section className="flex flex-col gap-2 w-11/12">
        {quizComments?.length ? (
          quizComments?.map(
            (comment) =>
              !comment.isDeleted && (
                <div key={comment.comment_id} className="flex gap-4 border-b p-2 h-full min-h-20">
                  <div>
                    <div className="w-14 h-14 rounded-full bg-gray-300">아바타</div>
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <div className="w-full flex gap-2 items-center justify-between min-h-8">
                      <div className="flex gap-2">
                        <p className="text-xs font-bold">@{comment.comment_creator}</p>
                        {/* <p>
            {getformattedDate(new Date(new Date(comment.created_at).getTime() + 9 * 60 * 60 * 1000).toString())}
          </p> */}
                        <p className="text-xs text-gray-500">
                          {Math.floor(
                            getHoursDifference(
                              new Date(new Date(comment.created_at).getTime() + 9 * 60 * 60 * 1000).toString()
                            )
                          )}
                          시간 전
                        </p>
                      </div>
                      <QuizCommentsDeleteBtn comment_id={comment.comment_id} />
                    </div>
                    <div className="w-full px-2">
                      <p className="break-all whitespace-normal overflow-wrap"> {comment.comment_content}</p>
                    </div>
                  </div>
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
