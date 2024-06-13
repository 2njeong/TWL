'use client';

import { useQuizListQuery } from '@/customHooks/useQueries/useQuizQuery';
import { useRef, useState } from 'react';

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
  const containerWidth = containerRef?.current?.getBoundingClientRect().width;

  const requestAnimation = () => {
    requestAnimationFrame(() => {
      if (!containerRef.current) return;
      containerRef.current.style.transform = `translateX(${position}px)`;
      containerRef.current.style.transition = 'transform 0.2s ease-in-out';
    });
  };

  const handleStart = (event: React.MouseEvent<Element, MouseEvent> | React.TouchEvent<Element>) => {
    setMouseDown(true);
    if ('screenX' in event) {
      setStartMoveX(event.screenX);
    } else {
      setStartMoveX(event.touches[0].screenX);
    }
  };

  const handleMove = (event: React.MouseEvent<Element, MouseEvent> | React.TouchEvent<Element>) => {
    if (mouseDown) {
      let deltaX;
      if ('screenX' in event) {
        deltaX = event.screenX - startMoveX;
        setStartMoveX(event.screenX);
      } else {
        deltaX = event.touches[0].screenX - startMoveX;
        setStartMoveX(event.touches[0].screenX);
      }
      setPosition((prev) => prev + deltaX); // 이전 위치에 이동 거리를 더함
      requestAnimation();
    } else {
      requestAnimation();
    }
  };

  const handleEnd = () => {
    setMouseDown(false);
    position < -(((containerWidth || 0) * 10) / 13)
      ? setPosition(-(((containerWidth || 0) * 10) / 13))
      : position > (containerRef.current?.offsetLeft || 0)
      ? setPosition(containerRef.current?.offsetLeft || 0)
      : null;
  };

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={containerRef}
        className="flex flex-nowrap gap-4 h-[300px] w-max overflow-x-visible"
        onMouseDown={handleStart}
        onMouseUp={handleEnd}
        onTouchStart={handleStart}
        onTouchEnd={handleEnd}
        onMouseMove={handleMove}
        onTouchMove={handleMove}
      >
        {quizList?.map((quiz, idx) => (
          <div
            ref={(el: any) => (testRef.current[idx] = el)}
            key={quiz.quiz_id}
            className="h-48 w-48 bg-yelTwo select-none"
          >
            {quiz.question}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotQuizList;
