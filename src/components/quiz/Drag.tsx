'use client';

import { useQuizListQuery } from '@/query/useQueries/useQuizQuery';
import { useEffect, useRef, useState } from 'react';

const HotQuizList = () => {
  const threshold = 50;
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

  const [mx, setMx] = useState(0);
  const slideWrapperRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const slideStatus = useRef({
    translateX: 0,
    currentSlideIndex: 0
  });

  const getNextSlideIndex = (step: number) =>
    Math.min(Math.max(0, slideStatus.current.currentSlideIndex + step), (quizList?.length || 0) - 1);

  const translateSlide = (translateX: number, animate?: boolean) => {
    requestAnimationFrame(() => {
      if (!slideWrapperRef.current) return;
      slideWrapperRef.current.style.transform = `translate3d(${translateX}px,0px,0px)`;
      slideWrapperRef.current.style.transition = animate ? 'transform 0.2s ease-out' : 'none';
    });
  };

  const translateSlideAndSetMatrix = (translateX: number) => {
    translateSlide(translateX, true);
    slideStatus.current.translateX = translateX;
  };

  // const [position, setPosition] = useState(0);
  // const [startMoveX, setStartMoveX] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);
  // const [movingX, setMovingX] = useState(0);

  // console.log('start--------------------------');
  // console.log('mouseDown =>', mouseDown);
  // console.log('startMoveX =>', startMoveX);
  // console.log('movingX =>', movingX);
  // console.log('position =>', position);
  // console.log('testRef[] =>', testRef.current[0]?.offsetLeft);

  const handleMouseDown = (clickEvent: React.MouseEvent<Element, MouseEvent>) => {
    // setStartMoveX(clickEvent.screenX);
    setMouseDown(true);
    translateSlide(slideStatus.current.translateX + mx);
  };

  const handleMouseMove = (moveEvent: React.MouseEvent<Element, MouseEvent>, idx: number) => {
    if (mouseDown) {
      // const deltaX = moveEvent.screenX - startMoveX;
      // setPosition((prev) => {
      //   console.log('prev =>', prev);
      //   return prev > 40 ? 35 : prev + deltaX;
      // }); // 이전 위치에 이동 거리를 더함
      // setStartMoveX(moveEvent.screenX); // 다음 이동을 위해 현재 마우스 위치로 업데이트
      setMx(moveEvent.screenX);
    }
  };

  const handleMouseUp = () => {
    // setMouseDown(false);
    // (testRef.current[0]?.offsetLeft || 0) > 40 ? testRef.current[0]?.offsetLeft === 35 : null;
    const nextSlideIndex = Math.abs(mx) < threshold ? getNextSlideIndex(0) : getNextSlideIndex(mx > 0 ? -1 : 1);
    const nextTranslateX = -(slidesRef.current[nextSlideIndex]?.offsetLeft || 0);
    // console.log(Math.abs(mx), threshold, nextSlideIndex, nextTranslateX);
    translateSlideAndSetMatrix(nextTranslateX);
    slideStatus.current.currentSlideIndex = nextSlideIndex;
    return;
  };

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={slideWrapperRef}
        className="flex flex-nowrap gap-4 h-[300px] w-max overflow-x-visible"
        // style={{
        //   transform: `translateX(${position > 40 ? 35 : position}px)`,
        //   transition: 'transform 0.2s ease-in-out'
        // }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {quizList?.map((quiz, idx) => (
          <div
            ref={(el: any) => (slidesRef.current[idx] = el)}
            key={quiz.quiz_id}
            className="h-48 w-48 bg-yelTwo select-none"
            onMouseMove={(e) => handleMouseMove(e, idx)}
          >
            {quiz.question}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotQuizList;
