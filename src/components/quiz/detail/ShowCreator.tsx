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

  console.log('둘 다 ===>', [creatorData, quizzes]);
  console.log('creatorData? =>', creatorData);
  console.log('quizzes? =>', quizzes);

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
    <div className="relative w-12" {...events()}>
      <AvatarImage src={creatorData.avatar ?? ''} alt="quiz creator" size="3" className="pointer-events-none" />
      {isCreatorOpen && (
        <div className={`absolute right-[90%] top-[-350%] flex pr-4 drop-shadow-xl z-[${ZINDEX.hoverZ}]`}>
          <div className={`w-64 h-96 bg-gray-500 rounded-xl p-4 flex flex-col justify-between`}>
            <div className="flex justify-center gap-4 items-center w-full h-20 border p-2">
              <AvatarImage
                src={creatorData.avatar ?? ''}
                alt="quiz creator"
                size="3.5"
                className="pointer-events-none"
              />
              <div className="w-32 text-center">{creatorData.nickname}</div>
            </div>
            <button className="w-full h-12 border" onClick={() => openNewWindow(creatorData.user_id)}>
              스터디 존 구경가기
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
