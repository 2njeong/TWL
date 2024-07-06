'use client';

import { MINDIFFERENCE } from '@/constants/algorithmConstants';
import { useEffect, useRef, useState } from 'react';

const AlgorithmPage = () => {
  const preApples = ['a', 'b', 'c', 'd', 'e'];
  const [apples, setApples] = useState<{ appleX: number; appleY: number }[]>([]);
  const treeRef = useRef<HTMLDivElement | null>(null);
  const applesRef = useRef<(HTMLDivElement | null)[]>([]);

  function getRandomInt(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }

  useEffect(() => {
    if (treeRef.current) {
      const treeRect = treeRef.current.getBoundingClientRect();
      const leftEndX = 0;
      const rightEndX = treeRect.width - 40;
      console.log('rightEndX =>', rightEndX);
      const topEndY = 0;
      const bottomEndY = treeRect.height - 40;

      //   const leftEndX = treeRef.current?.getBoundingClientRect().left + window.scrollX;
      const treeRight = treeRef.current?.getBoundingClientRect().right + window.scrollX;
      console.log('treeRight => ', treeRight);
      //   const topEndY = treeRef.current?.getBoundingClientRect().top + window.scrollY;
      const treeBottom = treeRef.current?.getBoundingClientRect().bottom + window.scrollY;
      console.log('treeBottom =>', treeBottom);
      // 트리 영역 내에 둘 거라면 굳이 트리 영역의 left와 top을 구할 필요도 없고,
      // 트리영역 대비 상대 좌표이기 때문에 트리영역의 top, left를 더해줄 필요가 없음

      const getRandomAppleXYArr = () => {
        const appleXYArr: { appleX: number; appleY: number }[] = [];

        while (appleXYArr.length < preApples.length) {
          let appleX = getRandomInt(leftEndX, rightEndX);
          let appleY = getRandomInt(topEndY, bottomEndY);
          let appleXY = { appleX, appleY };
          const isTooClose = appleXYArr.some(
            (appleXY) =>
              Math.abs(appleXY.appleX - appleX) < MINDIFFERENCE || Math.abs(appleXY.appleY - appleY) < MINDIFFERENCE
          );
          if (!isTooClose) {
            appleXYArr.push(appleXY);
          }
        }

        setApples(appleXYArr);
      };

      getRandomAppleXYArr();
    }
    console.log('----------------------------------------------');
  }, [treeRef.current]);

  useEffect(() => {
    console.log('appleXYArr =>', apples);
  }, [apples]);

  return (
    <div className="w-full flex justify-center">
      <div ref={treeRef} className="w-[500px] h-[450px] bg-gray-200 relative">
        트리영역
        {apples.map((apple, index) => (
          <div
            key={index}
            className={`absolute flex justify-center items-center w-10 h-10 bg-red-500 rounded-full`}
            style={{
              left: `${apple.appleX}px`,
              top: `${apple.appleY}px`
            }}
          >
            {index}
          </div>
        ))}
      </div>
      {/* {apples.map((apple, index) => (
        <div
          key={index}
          className={`absolute w-10 h-10 left-${apple.appleX} top-${apple.appleY}`}
          style={{
            position: 'absolute',
            left: `${apple.appleX}px`,
            top: `${apple.appleY}px`,
            backgroundColor: 'red',
            borderRadius: '50%'
          }}
        ></div>
      ))} */}
    </div>
  );
};

export default AlgorithmPage;
