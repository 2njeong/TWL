'use client';

import { useUnifiedHandler } from '@/customHooks';
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

  const threshold = 400;
  const containerRef = useRef<HTMLDivElement>(null);
  const testRef = useRef<(HTMLDivElement | null)[]>([]);

  const [position, setPosition] = useState(0);
  const [startMoveX, setStartMoveX] = useState(0);
  const movingRef = useRef({ start: 0, end: 0 });
  const distance = movingRef.current.start - movingRef.current.end;
  const [clickDown, setClickDown] = useState({ isDown: false, idx: 0 });

  useEffect(() => {
    const handleMouseLeave = () => {
      setClickDown((prev) => ({ ...prev, isDown: false }));
    };

    const container = containerRef.current;
    if (container) {
      containerRef.current.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  useEffect(() => {
    if (!clickDown.isDown) {
      requestAnimation();
      if (testRef.current.length && (clickDown.idx >= testRef.current.length - 2 || clickDown.idx < 2)) {
        setPosition(
          -(testRef.current[Math.min(testRef.current.length, Math.max(clickDown.idx - 1, 0))]?.offsetLeft as number)
        );
      }
    }
  }, [clickDown]);

  const requestAnimation = () => {
    requestAnimationFrame(() => {
      if (!containerRef.current) return;
      containerRef.current.style.transform = `translateX(${position}px)`;
      containerRef.current.style.transition = 'transform 0.2s ease-in-out';
    });
  };

  const handleStart = (event: React.MouseEvent<Element, MouseEvent> | React.TouchEvent<Element>, idx: number) => {
    setClickDown({ isDown: true, idx });
    if ('screenX' in event) {
      movingRef.current.start = event.screenX;
      setStartMoveX(event.screenX);
    } else {
      movingRef.current.start = event.touches[0].screenX;
      setStartMoveX(event.touches[0].screenX);
    }
  };

  const handleMove = (event: React.MouseEvent<Element, MouseEvent> | React.TouchEvent<Element>) => {
    let deltaX: number;
    if (clickDown.isDown) {
      if ('screenX' in event) {
        deltaX = event.screenX - startMoveX;
        setStartMoveX(event.screenX);
      } else {
        deltaX = event.touches[0].screenX - startMoveX;
        setStartMoveX(event.touches[0].screenX);
        movingRef.current.end = event.touches[0].screenX;
      }
      setPosition((prev) => prev + deltaX);
    }
    requestAnimation();
  };

  const handleEnd = (event: React.MouseEvent<Element, MouseEvent> | React.TouchEvent<Element>) => {
    setClickDown((prev) => ({ ...prev, isDown: false }));

    if ('screenX' in event) {
      movingRef.current.end = event.screenX;
    }
    setPosition((prev) => {
      if (Math.abs(distance) < threshold) {
        return prev;
      } else {
        return -(testRef.current[Math.min(testRef.current.length, Math.max(clickDown.idx - 1, 0))]
          ?.offsetLeft as number);
      }
    });
  };

  const eventHandlers = {
    onMouseDown: (e: React.MouseEvent<Element, MouseEvent>, idx: number) => handleStart(e, idx),
    onMouseMove: (e: React.MouseEvent<Element, MouseEvent>) => handleMove(e),
    onMouseUp: (e: React.MouseEvent<Element, MouseEvent>) => handleEnd(e),
    onTouchStart: (e: React.TouchEvent<Element>, idx: number) => handleStart(e, idx),
    onTouchMove: (e: React.TouchEvent<Element>) => handleMove(e),
    onTouchEnd: (e: React.TouchEvent<Element>) => handleEnd(e)
  };

  return (
    <div className="w-full overflow-hidden">
      <div ref={containerRef} className="flex flex-nowrap gap-4 h-[300px] w-max overflow-x-visible cursor-pointer">
        {quizList?.map((quiz, idx) => (
          <div
            ref={(el: any) => (testRef.current[idx] = el)}
            key={quiz.quiz_id}
            className="h-48 w-48 bg-yelTwo select-none"
            {...{
              ...eventHandlers,
              onMouseDown: (e) => eventHandlers.onMouseDown(e, idx),
              onTouchStart: (e) => eventHandlers.onTouchStart(e, idx)
            }}
          >
            {quiz.question}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotQuizList;
