'use client';

import { ZINDEX } from '@/constants/commonConstants';
import { TOP_QUIZ_LIKE_QUERY_KEY } from '@/query/quiz/quizQueryKeys';
import { HotQuizDragEventHandlers, TopLikesQuizList, TopLikesSingleQuiz } from '@/type/quizType';
import { useQueryClient } from '@tanstack/react-query';
import { FaHeart } from 'react-icons/fa';
import Link from 'next/link';
import { MutableRefObject } from 'react';
import { LiaCommentSolid } from 'react-icons/lia';

const HotQuizList = ({
  eventHandlers,
  hotQuizzesRef
}: {
  eventHandlers: HotQuizDragEventHandlers;
  hotQuizzesRef: MutableRefObject<(HTMLDivElement | null)[]>;
}) => {
  const queryClient = useQueryClient();
  const TopLikeQuizList = queryClient.getQueryData<TopLikesQuizList>([TOP_QUIZ_LIKE_QUERY_KEY]);

  return (
    <>
      {TopLikeQuizList?.map((quiz: TopLikesSingleQuiz, idx: number) => (
        <div
          ref={(el: any) => (hotQuizzesRef.current[idx] = el)}
          key={quiz.quiz_id}
          className={`max-sm:w-40 w-72 h-40 flex flex-col gap-2 bg-gray-100 border-2 rounded-md select-none`}
          style={{ zIndex: ZINDEX.hotQuizZ }}
          {...{
            ...eventHandlers,
            onMouseDown: (e) => eventHandlers.onMouseDown(e, idx),
            onTouchStart: (e) => eventHandlers.onTouchStart(e, idx)
          }}
        >
          <div className="w-full h-full p-4 flex flex-col justify-around border rounded">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold truncate w-9/12">Q. {quiz.question}</h1>
              <Link
                href={`/quiz/solve/${quiz.quiz_id}`}
                className="w-3/12 flex items-center justify-center border-2 border-green-300 rounded-full hover:bg-green-100 hover:border-none p-0.5 text-sm"
              >
                click!
              </Link>
            </div>
            <div className="flex justify-between gap-1 px-1">
              <p className="flex justify-center items-center border-2 border-gray-300 rounded w-3/12 text-sm">
                {quiz.issubjective ? '주관식' : '객관식'}
              </p>
              <p className="text-xs text-gray-500">{quiz.needhelp && '도움이 필요해요'}</p>
            </div>
            <div className="w-full flex gap-3 items-center justify-end">
              <div className="flex items-center gap-1">
                <FaHeart className="text-red-500" />
                <p className="text-sm">{quiz.users.length}</p>
              </div>
              <div className="flex items-center gap-1">
                <LiaCommentSolid className="text-lg" />
                <p className="text-sm">{quiz.comment_ids.length}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default HotQuizList;
