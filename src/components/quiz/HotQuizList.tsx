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

  const threshold = 100;
  const containerRef = useRef<HTMLDivElement>(null);
  const testRef = useRef<(HTMLDivElement | null)[]>([]);

  const [position, setPosition] = useState(0);
  const [startMoveX, setStartMoveX] = useState(0);
  const movingRef = useRef({ start: 0, end: 0 });
  const distance = movingRef.current.start - movingRef.current.end;
  const [clickDown, setClickDown] = useState({ isDown: false, idx: 0 });
  const [isMobile, setIsMobile] = useState(false);
  console.log('clickDown.idx =>', clickDown.idx);
  // console.log('position =>', position);
  // console.log('DeltaX =>', thedeltaX);
  // console.log('offsetLeft =>', containerRef.current?.offsetLeft);
  // console.log('-----------------------------------------');
  // console.log('10 =>', testRef.current[0]?.offsetLeft);
  // console.log('9 =>', testRef.current[1]?.offsetLeft);
  // console.log('8 =>', testRef.current[2]?.offsetLeft);
  // console.log('7 =>', testRef.current[3]?.offsetLeft);
  // console.log('6 =>', testRef.current[4]?.offsetLeft);
  // console.log('5 =>', testRef.current[5]?.offsetLeft);
  // console.log('4 =>', testRef.current[6]?.offsetLeft);
  // console.log('3 =>', testRef.current[7]?.offsetLeft);
  // console.log('startMoveX =>', startMoveX);
  // console.log('endtMoveX =>', endtMoveX);
  // console.log('start =>', movingRef.current.start);
  console.log('idx =>', Math.min(testRef.current.length - 1, Math.max(clickDown.idx - 1, 0)));
  console.log('움직인 거리 =>', distance);

  useEffect(() => {
    const handleResize = () => {
      if (!window) return;
      setIsMobile(window.innerWidth <= 768); // 예시로 768px 이하일 때 모바일로 간주
    };

    handleResize(); // 초기 한 번 호출
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
      if (clickDown.idx >= testRef.current.length - 2) {
        setPosition(
          -(testRef.current[Math.min(testRef.current.length - 1, Math.max(clickDown.idx - 1, 0))]?.offsetLeft as number)
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
      }
      setPosition((prev) => prev + deltaX);
    }
    requestAnimation();
  };

  const handleEnd = (event: React.MouseEvent<Element, MouseEvent> | React.TouchEvent<Element>) => {
    setClickDown((prev) => ({ ...prev, isDown: false }));
    if ('screenX' in event) {
      movingRef.current.end = event.screenX;
      setPosition((prev) => {
        if (Math.abs(distance) < threshold) {
          console.log('작아');
          return prev;
        } else {
          console.log('커');
          return -(testRef.current[Math.min(testRef.current.length - 1, Math.max(clickDown.idx - 1, 0))]
            ?.offsetLeft as number);
        }
      });
    }
  };

  // useUnifiedHandler({ ref: containerRef, handlers: { handleStart, handleMove, handleEnd } });
  // useUnifiedHandler({ ref: containerRef, handlers: { handleStart, handleMove } });

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={containerRef}
        className="flex flex-nowrap gap-4 h-[300px] w-max overflow-x-visible cursor-pointer"
        // style={
        //   isMobile
        //     ? {
        //         transform: `translateX(${position}px)`,
        //         transition: 'transform 0.2s ease-in-out'
        //       }
        //     : {}
        // }
      >
        {quizList?.map((quiz, idx) => (
          <div
            ref={(el: any) => (testRef.current[idx] = el)}
            key={quiz.quiz_id}
            className="h-48 w-48 bg-yelTwo select-none"
            onMouseDown={(e) => handleStart(e, idx)}
            onMouseMove={(e) => handleMove(e)}
            onMouseUp={(e) => handleEnd(e)}
          >
            {quiz.question}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotQuizList;
