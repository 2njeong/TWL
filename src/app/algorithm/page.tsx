'use client';

import { useEffect, useRef } from 'react';

const AlgorithmPage = () => {
  const treeRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (treeRef.current) {
      console.log('left =>', treeRef.current?.getBoundingClientRect().left);
      console.log('좌측 가장자리 X좌표 =>', treeRef.current?.getBoundingClientRect().left + window.scrollX);
      console.log('right =>', treeRef.current?.getBoundingClientRect().right);
      console.log('우측 가장자리 X좌표 =>', treeRef.current?.getBoundingClientRect().right + window.scrollX);
      console.log('bottom  =>', treeRef.current?.getBoundingClientRect().bottom);
      console.log('하단 가장자리 Y좌표  =>', treeRef.current?.getBoundingClientRect().bottom + window.scrollY);
      console.log('top =>', treeRef.current?.getBoundingClientRect().top);
      console.log('상단 가장자리 Y좌표 =>', treeRef.current?.getBoundingClientRect().top + window.scrollY);
    }

    // console.log('height  =>', treeRef.current?.getBoundingClientRect().height);
    // console.log('width  =>', treeRef.current?.getBoundingClientRect().width);
    // console.log('x  =>', treeRef.current?.getBoundingClientRect().x);
    // console.log('y  =>', treeRef.current?.getBoundingClientRect().y);
    console.log('----------------------------------------------');
  }, []);

  const getRandomPosition = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  return (
    <div className="w-full flex justify-center">
      <div ref={treeRef} className="w-[500px] h-[450px] bg-gray-200">
        트리영역
      </div>
    </div>
  );
};

export default AlgorithmPage;
