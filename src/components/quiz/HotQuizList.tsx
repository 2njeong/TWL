'use client';

import { useQuizListQuery } from '@/customHooks/useQueries/useQuizQuery';
import { useEffect, useRef, useState } from 'react';

const HotQuizList = () => {
  const {
    data: quizList,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isRefetching
  } = useQuizListQuery();
  const containerRef = useRef<HTMLDivElement>(null);
  const testRef = useRef<(HTMLDivElement | null)[]>([]);

  const [position, setPosition] = useState(0);
  const [startMoveX, setStartMoveX] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);
  const [movingX, setMovingX] = useState(0);
  const containerWidth = containerRef?.current?.getBoundingClientRect().width;

  const handleMouseDown = (clickEvent: React.MouseEvent<Element, MouseEvent>) => {
    setMouseDown(true);
    setStartMoveX(clickEvent.screenX);
  };

  const requestAnimation = () => {
    requestAnimationFrame(() => {
      if (!containerRef.current) return;
      containerRef.current.style.transform = `translateX(${position}px)`;
      containerRef.current.style.transition = 'transform 0.2s ease-in-out';
    });
  };

  const handleMouseMove = (moveEvent: React.MouseEvent<Element, MouseEvent>) => {
    if (mouseDown) {
      const deltaX = moveEvent.screenX - startMoveX;
      setPosition((prev) => prev + deltaX); // 이전 위치에 이동 거리를 더함
      setStartMoveX(moveEvent.screenX);
      requestAnimation();
    } else {
      requestAnimation();
      position < -3200 ? setPosition(-3200) : position > 40 ? setPosition(40) : null;
    }
  };

  const handleMouseUp = () => {
    setMouseDown(false);
  };

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={containerRef}
        className="flex flex-nowrap gap-4 h-[300px] w-max overflow-x-visible"
        onMouseUp={handleMouseUp}
      >
        {quizList?.map((quiz, idx) => (
          <div
            ref={(el: any) => (testRef.current[idx] = el)}
            key={quiz.quiz_id}
            className="h-48 w-48 bg-yelTwo select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
          >
            {quiz.question}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotQuizList;
