'use client';

import { ZINDEX } from '@/constants/commonConstants';
import { useCreatorNQuiz } from '@/query/useQueries/useQuizQuery';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const ShowCreator = ({ creator }: { creator: string }) => {
  const {
    data: [creatorData, quizzes]
  } = useCreatorNQuiz(creator);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);

  // console.log('가져온 애 ===>', [creatorData, quizzes]);
  // console.log('creatorData? =>', creatorData);
  // console.log('quizzes? =>', quizzes);

  const handleMouseEnter = () => {
    setIsCreatorOpen(true);
  };

  const handleMouseLeave = () => {
    setIsCreatorOpen(false);
  };

  const handleTouchMove = (e: React.TouchEvent<Element>) => {
    if (e) {
      setIsCreatorOpen(true);
    } else {
      setIsCreatorOpen(false);
    }
  };

  const events = () => ({
    onMouseEnter: () => handleMouseEnter(),
    onMouseLeave: () => handleMouseLeave(),
    onTouchMove: (e: React.TouchEvent<Element>) => handleTouchMove(e)
  });

  return (
    <div className="relative w-12" {...events()}>
      <div className="relative w-12 h-12 rounded-full bg-gray-300">
        {/* <Image
          src={creatorData.avatar ?? ''}
          alt="유저 이미지"
          fill={true}
          style={{ objectFit: 'contain', borderRadius: '3px', pointerEvents: 'none' }}
          sizes="500px"
          priority={true}
        ></Image> */}
      </div>

      {isCreatorOpen && (
        <div className={`absolute right-[90%] top-[-350%] flex pr-4 drop-shadow-xl z-[${ZINDEX.hoverZ}]`}>
          <div className={`w-64 h-96 bg-gray-500 rounded-xl p-4 flex flex-col justify-between`}>
            <div className="flex justify-center gap-4 items-center w-full h-20 border p-2">
              <div className="relative w-12 h-12 rounded-full bg-gray-300">
                {/* <Image
                  src={creatorData.avatar ?? ''}
                  alt="유저 이미지"
                  fill={true}
                  style={{ objectFit: 'contain', borderRadius: '3px', pointerEvents: 'none' }}
                  sizes="500px"
                  priority={true}
                ></Image> */}
              </div>
              <div className="w-32 text-center">{creatorData.nickname}</div>
            </div>
            <button className="w-full h-12 border">
              <Link href={`/member/${creatorData.user_id}`}>스터디 존 구경가기</Link>
            </button>
            <div className="w-full h-16 border">간단소개</div>
            <div className="w-full h-32 border">
              최근활동
              <h4>Q.{quizzes[0].question}</h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowCreator;
