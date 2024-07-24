'use client';

import AvatarImage from '@/components/member/information/AvatarImage';
import HoverCreator from '@/components/utilComponents/HoverCreator';
import { useHoverEvent } from '@/customHooks/common';
import { useCreatorNQuiz } from '@/query/useQueries/useQuizQuery';
import { Tables } from '@/type/database';

const ShowCreator = ({ theQuiz }: { theQuiz: Tables<'quiz'> | undefined }) => {
  const { creator } = theQuiz ?? {};
  const {
    data: [creatorData, quizzes]
  } = useCreatorNQuiz(creator ?? '');
  const { isCreatorOpen, events } = useHoverEvent();

  const creatorProps = {
    isCreatorOpen,
    creator: creatorData.user_id,
    avatar: creatorData.avatar,
    nickname: creatorData.nickname,
    quizzes
  };

  return (
    <div className={`relative w-12 ml-2 flex items-center`} {...events()}>
      <AvatarImage
        src={creatorData.avatar ?? ''}
        alt="quiz creator"
        size="2.5"
        className="pointer-events-none border-2"
      />
      <HoverCreator {...creatorProps} />
    </div>
  );
};

export default ShowCreator;
