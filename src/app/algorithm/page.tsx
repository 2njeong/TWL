'use client';

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
      const leftEndX = treeRef.current?.getBoundingClientRect().left + window.scrollX;
      const rightEndX = treeRef.current?.getBoundingClientRect().right + window.scrollX;
      const topEndY = treeRef.current?.getBoundingClientRect().top + window.scrollY;
      const bottomEndY = treeRef.current?.getBoundingClientRect().bottom + window.scrollY;

      const appleXYArr = preApples.reduce((acc, _) => {
        let appleX: number, appleY: number, appleXY;

        do {
          appleX = getRandomInt(leftEndX, rightEndX);
          appleY = getRandomInt(topEndY, bottomEndY);
          appleXY = { appleX, appleY };
        } while (acc.some((item) => item.appleX === appleX && item.appleY === appleY));
        acc.push(appleXY);

        return acc;
      }, [] as { appleX: number; appleY: number }[]);

      console.log('appleXYArr =>', appleXYArr);
      setApples(appleXYArr);
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
      </div>
      {apples.map((apple, index) => (
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
      ))}
    </div>
  );
};

export default AlgorithmPage;
