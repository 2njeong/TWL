'use client';

import { ZINDEX } from '@/constants/commonConstants';
import AvatarImage from '../member/information/AvatarImage';
import { Tables } from '@/type/database';
import { openNewWindow } from '@/utils/utilFns';

type CreatorProps = {
  isCreatorOpen: boolean;
  creator: string | undefined;
  avatar: string | null;
  nickname: string | null;
  position?: string;
  quizzes?: Tables<'quiz'>[];
};

const HoverCreator = (creatorProps: CreatorProps) => {
  const { isCreatorOpen, creator, avatar, nickname, position, quizzes } = creatorProps;

  return (
    <>
      {isCreatorOpen && (
        <div
          className={`absolute ${position ? position : 'translate-x-[30%] -translate-y-[40%]'} flex drop-shadow-xl`}
          style={{ zIndex: ZINDEX.hoverZ }}
        >
          <div className={`w-44 h-58 bg-white bg-opacity-80 rounded-xl p-2 flex flex-col gap-2`}>
            <div className="w-full flex items-center justify-around p-2">
              <AvatarImage
                src={avatar ?? '/basic_avatar.png'}
                alt="quiz creator"
                size="3"
                className="pointer-events-none border-2"
              />
              <div className="w-20 flex items-center justify-center">
                <p className="text-sm">{nickname}</p>
              </div>
            </div>
            <button
              className="w-full border-2 rounded p-1 text-sm hover:bg-gray-200"
              onClick={() => openNewWindow(creator)}
            >
              스터디 존 구경가기
            </button>
            {quizzes && (
              <div className="w-full flex flex-col gap-2 border p-2">
                <p className="text-sm text-gray-500">최근활동</p>
                <h4 className="truncate">Q. {quizzes[0].question}</h4>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default HoverCreator;
