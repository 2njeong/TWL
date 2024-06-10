'use client';

import { useQuizListQuery } from '@/customHooks/useQueries/useQuizQuery';
import { useEffect, useRef, useState } from 'react';

const HotQuizList = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const testRef = useRef<(HTMLDivElement | null)[]>([]);

  const [position, setPosition] = useState(0);
  const [startMoveX, setStartMoveX] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);
  const [movingX, setMovingX] = useState(0);

  console.log('start--------------------------');
  console.log('mouseDown =>', mouseDown);
  console.log('startMoveX =>', startMoveX);
  console.log('movingX =>', movingX);
  console.log('position =>', position);

  const [x, setX] = useState(0);
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

  const handleMouseDown = (clickEvent: React.MouseEvent<Element, MouseEvent>) => {
    setStartMoveX(clickEvent.screenX);
    setMouseDown(true);
  };

  const handleMouseMove = (moveEvent: React.MouseEvent<Element, MouseEvent>) => {
    if (mouseDown) {
      const deltaX = moveEvent.screenX - startMoveX;
      setPosition((prev) => prev + deltaX); // 이전 위치에 이동 거리를 더함
      setStartMoveX(moveEvent.screenX); // 다음 이동을 위해 현재 마우스 위치로 업데이트
    }
  };

  const handleMouseUp = () => {
    setMouseDown(false);
  };

  return (
    <div className="w-full overflow-hidden" ref={containerRef}>
      <div
        className="flex flex-nowrap gap-4 h-[300px] w-max overflow-x-visible"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          transform: `translateX(${position}px)`
        }}
      >
        <div className="h-10 w-20 bg-yelTwo">1</div>
        <div className="h-10 w-20 bg-yelTwo">2</div>
        <div className="h-10 w-20 bg-yelTwo" ref={innerRef}>
          3
        </div>
        <div className="h-10 w-20 bg-yelTwo">4</div>
        <div className="h-10 w-20 bg-yelTwo">5</div>
        <div className="h-10 w-20 bg-yelTwo">6</div>
        <div className="h-10 w-20 bg-yelTwo">7</div>
        <div className="h-10 w-20 bg-yelTwo">8</div>
        <div className="h-10 w-20 bg-yelTwo">9</div>
        <div className="h-10 w-20 bg-yelTwo">10</div>
        <div className="h-10 w-20 bg-yelTwo">11</div>
        <div className="h-10 w-20 bg-yelTwo">12</div>
        <div className="h-10 w-20 bg-yelTwo">13</div>
        <div className="h-10 w-20 bg-yelTwo">14</div>
        <div className="h-10 w-20 bg-yelTwo">15</div>
        <div className="h-10 w-20 bg-yelTwo">16</div>
        <div className="h-10 w-20 bg-yelTwo">17</div>
        <div className="h-10 w-20 bg-yelTwo">18</div>
        <div className="h-10 w-20 bg-yelTwo">19</div>

        {/* <div
        ref={thisRef}
        className="h-10 w-10 bg-yelTwo"
        style={{
          transform: `translateX(${
            mouseDown && endMoveX !== startMoveX ? movingX - (containerRef.current?.offsetLeft ?? 0) : null
          }px)`
        }}
        onMouseMove={(moveEvent: React.MouseEvent<Element, MouseEvent>) => {
          setMovingX(moveEvent.screenX);
        }}
      ></div> */}
        {/* 
      {quizList?.map((quiz, idx) => (
        <div key={quiz.quiz_id} ref={(el) => (testRef.current[idx] = el)} className="h-12 w-12 bg-yelTwo">
          {quiz.question}
        </div>
      ))} */}
      </div>
    </div>
  );
};

export default HotQuizList;
