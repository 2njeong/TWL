'use client';

import { ZINDEX } from '@/constants/commonConstants';
import { useFetchTopQuizLike } from '@/query/useQueries/useQuizQuery';
import { HotQuizDragEventHandlers, TopLikesSingleQuiz } from '@/type/quizType';
import Link from 'next/link';
import { MutableRefObject } from 'react';

const HotSingleQuiz = ({
  eventHandlers,
  hotQuizzesRef
}: {
  eventHandlers: HotQuizDragEventHandlers;
  hotQuizzesRef: MutableRefObject<(HTMLDivElement | null)[]>;
}) => {
  const { data: TopLikeQuizList } = useFetchTopQuizLike();

  // console.log('TopLikeQuizList =>', TopLikeQuizList);
  return (
    <>
      {TopLikeQuizList?.map((quiz: TopLikesSingleQuiz, idx: number) => (
        <div
          ref={(el: any) => (hotQuizzesRef.current[idx] = el)}
          key={quiz.quiz_id}
          className={`w-72 h-48 flex flex-col gap-2 bg-yelTwo rounded select-none z-${ZINDEX.hotQuizZ}`}
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
          </Link>
        </div>
      ))}
    </>
  );
};

export default HotSingleQuiz;
