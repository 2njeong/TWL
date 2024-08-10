'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import SlideBtns from './SlideBtns';

const IntroSlide = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const picsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mainPictureArr = [
    { text: '문제와 알고리즘 풀이를 공유해요!', img: '/main1.png' },
    { text: '주관식, 객관식 원하는 유형의 문제를 제출해보세요! ', img: '/main2.png' },
    { text: '다른 스터디원의 문제를 풀고 댓글을 달아보세요!', img: '/main3.png' },
    { text: '스터디존에서 todolist를 공유하고 방명록을 남길 수 있어요!', img: '/main4.png' }
  ];
  const [picIdx, setPicIdx] = useState(0);

  useEffect(() => {
    const requestAnimation = () => {
      requestAnimationFrame(() => {
        if (!containerRef.current) return;
        containerRef.current.style.transform = `translateX(-${picsRef.current[picIdx]?.offsetLeft}px)`;
        containerRef.current.style.transition = 'transform 0.2s ease-in-out';
      });
    };
    requestAnimation();
  }, [picIdx]);

  return (
    <div className="h-full w-full max-w-[800px] border-b flex items-center">
      <div className="h-4/5 w-full relative flex justify-center items-center overflow-x-hidden">
        <SlideBtns picIdx={picIdx} setPicIdx={setPicIdx} />
        <div ref={containerRef} className="flex h-full w-full gap-4 items-center">
          {mainPictureArr.map((picture, idx) => (
            <div
              key={picture.img}
              ref={(el: any) => (picsRef.current[idx] = el)}
              className="relative min-w-full h-[90%] flex justify-start pt-2"
            >
              <h2 className="absolute z-[10] text-gray-500 font-semibold ml-24 rounded-md">{picture.text}</h2>
              <Image
                src={picture.img}
                alt="메인 이미지1"
                fill={true}
                className="object-contain"
                sizes="800px"
                priority={true}
                blurDataURL="/loading_img.gif"
                placeholder="blur"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntroSlide;
