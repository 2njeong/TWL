'use client';

import { ZINDEX } from '@/constants/commonConstants';
import { TOP_QUIZ_LIKE_QUERY_KEY } from '@/query/quiz/quizQueryKeys';
import { HotQuizDragEventHandlers, TopLikesQuizList, TopLikesSingleQuiz } from '@/type/quizType';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { MutableRefObject } from 'react';

const HotQuizList = ({
  eventHandlers,
  hotQuizzesRef
}: {
  eventHandlers: HotQuizDragEventHandlers;
  hotQuizzesRef: MutableRefObject<(HTMLDivElement | null)[]>;
}) => {
  const queryClient = useQueryClient();
  const TopLikeQuizList = queryClient.getQueryData<TopLikesQuizList>([TOP_QUIZ_LIKE_QUERY_KEY]);

  console.log('TopLikeQuizList =>', TopLikeQuizList);
  return (
    <>
      {TopLikeQuizList?.map((quiz: TopLikesSingleQuiz, idx: number) => (
        <div
          ref={(el: any) => (hotQuizzesRef.current[idx] = el)}
          key={quiz.quiz_id}
          className={`max-sm:w-40 w-72 h-48 flex flex-col gap-2 bg-yelTwo rounded select-none z-${ZINDEX.hotQuizZ}`}
          {...{
            ...eventHandlers,
            onMouseDown: (e) => eventHandlers.onMouseDown(e, idx),
            onTouchStart: (e) => eventHandlers.onTouchStart(e, idx)
          }}
        >
          <Link href={`/quiz/solve/${quiz.quiz_id}`} className="border rounded">
            <p>{quiz.question}</p>
            <p>{quiz.issubjective ? '주관식' : '객관식'}</p>
            <p>{quiz.needhelp && '도움이 필요해요'}</p>
            <p>좋아요 수: {quiz.users.length}</p>
            <p>댓글: {quiz.comment_ids.length}</p>
          </Link>
        </div>
      ))}
    </>
  );
};

export default HotQuizList;
