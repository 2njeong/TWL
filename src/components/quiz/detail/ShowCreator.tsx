'use client';

import AvatarImage from '@/components/member/information/AvatarImage';
import { ZINDEX } from '@/constants/commonConstants';
import { useCreatorNQuiz } from '@/query/useQueries/useQuizQuery';
import { useState } from 'react';

const ShowCreator = ({ creator }: { creator: string }) => {
  const {
    data: [creatorData, quizzes]
  } = useCreatorNQuiz(creator);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);

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

  const openNewWindow = (creator_id: string) => {
    const features =
      'width=1400,height=800,resizable=yes,scrollbars=no,status=yes,toolbar=no,menubar=no,location=yes, noopener, noreferrer';
    window.open(`/member/${creator_id}`, '_blank', features);
  };

  return (
    <div className="relative w-14 ml-2" {...events()}>
      <AvatarImage
        src={creatorData.avatar ?? ''}
        alt="quiz creator"
        size="2.5"
        className="pointer-events-none border-2"
      />
      {isCreatorOpen && (
        <div className={`absolute translate-x-[30%] -translate-y-[110%] flex drop-shadow-xl z-[${ZINDEX.hoverZ}]`}>
          <div className={`w-40 h-58 bg-white bg-opacity-80 rounded-xl p-2 flex flex-col gap-2`}>
            <div className=" w-full flex items-center justify-around p-2">
              <AvatarImage
                src={creatorData.avatar ?? ''}
                alt="quiz creator"
                size="3"
                className="pointer-events-none border-2"
              />
              <div className="w-3/6 flex items-center justify-center">
                <p>{creatorData.nickname}</p>
              </div>
            </div>
            <button
              className="w-full border-2 rounded p-1 text-sm hover:bg-gray-200"
              onClick={() => openNewWindow(creatorData.user_id)}
            >
              스터디 존 구경가기
            </button>
            <div className="w-full flex flex-col gap-2 border p-2">
              <p className="text-sm text-gray-500">최근활동</p>
              <h4 className="truncate">Q. {quizzes[0].question}</h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowCreator;
