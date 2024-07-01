'use client';

import { useQuizCommentsQuery } from '@/query/useQueries/useQuizQuery';
import { getHoursDifference } from '@/utils/utilFns';
import QuizCommentsDeleteBtn from './QuizCommentsDeleteBtn';

const QuizCommetsList = () => {
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

  //   console.log('quizComments =>', quizComments);
  return (
    <section className="flex flex-col gap-2 w-11/12">
      {quizComments?.map(
        (comment) =>
          !comment.isDeleted && (
            <div key={comment.comment_id} className="flex gap-4 border-b p-2">
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
                  <QuizCommentsDeleteBtn comment_id={comment.comment_id} />
                </div>
                <div className="w-full px-2">
                  <p className="break-all whitespace-normal overflow-wrap"> {comment.comment_content}</p>
                </div>
              </div>
            </div>
          )
      )}
    </section>
  );
};

export default QuizCommetsList;
