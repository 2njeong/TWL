'use client';

import { ZINDEX } from '@/constants/commonConstants';
import { useFetchTopQuizLike } from '@/query/useQueries/useQuizQuery';
import { TopLikesSingleQuiz } from '@/type/quizType';
import { useEffect, useRef, useState } from 'react';

const HotQuizList = () => {
  const { data: TopLikeQuizList, isLoading } = useFetchTopQuizLike();

  // console.log('quizList => ', TopLikeQuizList);

  const threshold = 400;
  const containerRef = useRef<HTMLDivElement>(null);
  const testRef = useRef<(HTMLDivElement | null)[]>([]);
  const [clickDown, setClickDown] = useState({ isDown: false, idx: 0 });
  const [startMoveX, setStartMoveX] = useState(0);
  const [position, setPosition] = useState(0);
  const movingRef = useRef({ start: 0, end: 0 });
  const distance = movingRef.current.start - movingRef.current.end;
  const safeDistance = testRef.current[Math.min(testRef.current.length, Math.max(clickDown.idx - 1, 0))]
    ?.offsetLeft as number;

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
    // 마우스가 화면을 벗어나서 clickDown.isDown이 false가 됐을 때도 에니메이션이 적용되도록
    if (!clickDown.isDown) {
      requestAnimation();
      // 일정 이상 드래그 넘어갔을 때 안전장치
      if (testRef.current.length && (clickDown.idx >= testRef.current.length - 2 || clickDown.idx < 2)) {
        setPosition(-safeDistance);
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
        const touchScreenX = event.touches[0].screenX;
        deltaX = touchScreenX - startMoveX;
        setStartMoveX(touchScreenX);
        movingRef.current.end = touchScreenX;
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
        // 기본적으로 distance의 절댓값이 threshold 보다 크면 그 전 요소로 드래그 되도록
        return -safeDistance;
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
    <div className="w-full h-72 overflow-hidden">
      {isLoading && (
        <div className="w-full h-full flex justify-center items-center">
          <p>인기 있는 질문들을 불러오고 있어요!</p>
        </div>
      )}
      <div
        ref={containerRef}
        className="flex items-center flex-nowrap gap-4 h-64 w-max overflow-x-visible cursor-pointer"
      >
        {TopLikeQuizList?.map((quiz: TopLikesSingleQuiz, idx: number) => (
          <div
            ref={(el: any) => (testRef.current[idx] = el)}
            key={quiz.quiz_id}
            className={`w-48 h-48 bg-yelTwo select-none z-${ZINDEX.hotQuizZ}`}
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
