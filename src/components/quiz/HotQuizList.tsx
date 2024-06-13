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

  const containerRef = useRef<HTMLDivElement>(null);
  const testRef = useRef<(HTMLDivElement | null)[]>([]);

  const [position, setPosition] = useState(0);
  const [startMoveX, setStartMoveX] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerWidth = containerRef?.current?.getBoundingClientRect().width;
  console.log('position =>', position);
  console.log('1 =>', containerRef.current?.offsetLeft);

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
    const maxWhiteSpace = isMobile ? -3850 : -3200;
    const minWhiteSpace = 40;
    position < maxWhiteSpace
      ? setPosition(maxWhiteSpace)
      : position > minWhiteSpace
      ? setPosition(minWhiteSpace)
      : null;
  };

  useUnifiedHandler({ ref: containerRef, handlers: { handleStart, handleMove, handleEnd } });

  // 모바일 화면일 때 추가할 스타일 객체
  const mobileStyles = isMobile
    ? {
        transform: `translateX(${position}px)`,
        transition: 'transform 0.2s ease-in-out'
      }
    : {};

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={containerRef}
        className="flex flex-nowrap gap-4 h-[300px] w-max overflow-x-visible cursor-pointer"
        style={{
          ...mobileStyles // 모바일 화면에서만 적용할 스타일 객체를 동적으로 설정
        }}
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
