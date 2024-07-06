'use client';

import { APPLESIZE, MINDIFFERENCE } from '@/constants/algorithmConstants';
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
      const rightEndX = treeRect.width - APPLESIZE * 16;
      const topEndY = 0;
      const bottomEndY = treeRect.height - APPLESIZE * 16;

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
            className={`absolute flex justify-center items-center w-${APPLESIZE} h-${APPLESIZE} bg-red-500 rounded-full`}
            style={{
              left: `${apple.appleX}px`,
              top: `${apple.appleY}px`
            }}
          >
            {index}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlgorithmPage;
