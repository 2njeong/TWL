'use client';

import { Tables } from '@/type/database';
import { useQuizCommentsQuery } from '@/query/useQueries/useQuizQuery';
import { getHoursDifference } from '@/utils/utilFns';
import QuizCommentForm from './QuizCommentForm';
import { useRef } from 'react';

const QuizComments = ({ theQuiz, user_id }: { theQuiz: Tables<'quiz'> | undefined; user_id: string | undefined }) => {
  const commentFormRef = useRef<HTMLFormElement | null>(null);
  const {
    data: quizComments,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isRefetching
  } = useQuizCommentsQuery();

  return (
    <div className="w-full flex flex-col items-center p-2 gap-2">
      <h1 className="w-11/12 text-left">Comments()</h1>
      <QuizCommentForm theQuiz={theQuiz} user_id={user_id} commentFormRef={commentFormRef} />
      <section className="flex flex-col gap-2 w-11/12">
        {quizComments?.map((comment) => (
          <div key={comment.comments_id} className="flex gap-4 border-b p-2">
            <div>
              <div className="w-14 h-14 rounded-full bg-gray-300">아바타</div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="w-full flex gap-2 items-center justify-between">
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
                <div>취소/삭제</div>
              </div>
              <p> {comment.comment_content}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default QuizComments;
