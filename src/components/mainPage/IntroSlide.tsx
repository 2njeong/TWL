'use client';
import Image from 'next/image';

const IntroSlide = () => {
  const mainPictureArr = [
    { text: '주관식, 객관식 원하는 유형의 문제를 제출해보세요.', img: '/main4.png' },
    { text: '다른 스터디원의 문제를 풀고 댓글을 달아보세요.', img: '/main3.png' },
    { text: '문제와 알고리즘 풀이를 공유해요!', img: '/main1.png' },
    { text: '미니홈피에서 todolist를 공유하고 방명록을 남길 수 있어요.', img: '/main2.png' }
  ];
  return (
    <div className="h-full w-full max-w-[800px] border flex items-center px-8">
      <div className="border h-4/5 w-full relative flex">
        {/* <div className="absolute top-1/2 w-full flex justify-between px-4">
          <button className="w-6 h-6 border rounded-full hover:bg-gray-200"></button>
          <button className="w-6 h-6 border rounded-full hover:bg-gray-200"></button>
        </div> */}
        {/* {mainPictureArr.map((picture) => (
          <div key={picture.img} className="h-full w-full relative">
            <Image
              src={picture.img}
              alt="메인 이미지1"
              fill={true}
              className="object-contain"
              sizes="1000px"
              priority={true}
              blurDataURL="/loading_img.gif"
              placeholder="blur"
            />
          </div>
        ))} */}
        <div className="flex h-full w-full gap-4 overflow-x-visible">
          {mainPictureArr.map((picture) => (
            <div key={picture.img} className="relative min-w-[500px]">
              <Image
                src={picture.img}
                alt="메인 이미지1"
                fill={true}
                className="object-contain"
                sizes="5000px"
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
