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

  console.log('start--------------------------');
  console.log('mouseDown =>', mouseDown);
  console.log('startMoveX =>', startMoveX);
  console.log('position =>', position);
  console.log('마지막 =>', testRef.current[19]?.getClientRects()[0].right);
  console.log('이거봐바', containerRef.current?.getBoundingClientRect());
  console.log('저거봐바', containerRef.current?.scrollWidth);

  // useEffect(() => {
  //   if (testRef.current[19] && testRef.current[19].getClientRects()[0].right < 1000) {
  //     testRef.current[19]?.getClientRects()[0].right === 1000;
  //   }
  // }, [position, mouseDown]);

  const handleMouseDown = (clickEvent: React.MouseEvent<Element, MouseEvent>, idx: number) => {
    console.log('idx =>', idx);
    setStartMoveX(clickEvent.screenX);
    setMouseDown(true);
  };

  const handleMouseMove = (moveEvent: React.MouseEvent<Element, MouseEvent>) => {
    if (mouseDown) {
      const deltaX = moveEvent.screenX - startMoveX;
      setPosition((prev) => {
        console.log('prev =>', prev);
        return prev + deltaX;
      }); // 이전 위치에 이동 거리를 더함
      setStartMoveX(moveEvent.screenX); //
      requestAnimationFrame(() => {
        if (!containerRef.current) return;
        containerRef.current.style.transform = `translateX(${position}px)`;
        containerRef.current.style.transition = 'transform 0.2s ease-in-out';
      });
    } else {
      // position ?? setPosition(-3200);
      requestAnimationFrame(() => {
        if (!containerRef.current) return;
        containerRef.current.style.transform = `translateX(${
          position < -3200 ? -3200 : position > 40 ? 35 : position
        }px)`;
        containerRef.current.style.transition = 'transform 0.2s ease-in-out';
      });
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
        // style={{
        //   transform: `translateX(${position > 40 ? 35 : position}px)`,
        //   transition: 'transform 0.2s ease-in-out'
        // }}

        onMouseUp={handleMouseUp}
      >
        {quizList?.map((quiz, idx) => (
          <div
            ref={(el: any) => (testRef.current[idx] = el)}
            key={quiz.quiz_id}
            className="h-48 w-48 bg-yelTwo select-none"
            onMouseDown={(e) => handleMouseDown(e, idx)}
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
