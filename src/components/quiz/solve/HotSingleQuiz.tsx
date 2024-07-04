'use client';

import { ZINDEX } from '@/constants/commonConstants';
import { useFetchTopQuizLike } from '@/query/useQueries/useQuizQuery';
import { HotQuizDragEventHandlers, TopLikesSingleQuiz } from '@/type/quizType';
import { MutableRefObject } from 'react';

const HotSingleQuiz = ({
  eventHandlers,
  hotQuizzesRef
}: {
  eventHandlers: HotQuizDragEventHandlers;
  hotQuizzesRef: MutableRefObject<(HTMLDivElement | null)[]>;
}) => {
  const { data: TopLikeQuizList, isLoading } = useFetchTopQuizLike();

  return (
    <>
      {TopLikeQuizList?.map((quiz: TopLikesSingleQuiz, idx: number) => (
        <div
          ref={(el: any) => (hotQuizzesRef.current[idx] = el)}
          key={quiz.quiz_id}
          className={`w-72 h-48 bg-yelTwo rounded select-none z-${ZINDEX.hotQuizZ}`}
          {...{
            ...eventHandlers,
            onMouseDown: (e) => eventHandlers.onMouseDown(e, idx),
            onTouchStart: (e) => eventHandlers.onTouchStart(e, idx)
          }}
        >
          {quiz.question}
        </div>
      ))}
    </>
  );
};

export default HotSingleQuiz;
