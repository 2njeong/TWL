'use client';

import AvatarImage from '@/components/member/information/AvatarImage';
import DeleteBtn from '@/components/utilComponents/DeleteBtn';
import HoverCreator from '@/components/utilComponents/HoverCreator';
import { useHoverEvent } from '@/customHooks/common';
import { QUIZLIST_QUERY_KEY } from '@/query/quiz/quizQueryKeys';
import { useFetchCurrentUser } from '@/query/useQueries/useAuthQuery';
import { useCreatorNQuiz } from '@/query/useQueries/useQuizQuery';
import { Tables } from '@/type/database';
import { useRouter } from 'next/navigation';

const ShowCreator = ({ theQuiz }: { theQuiz: Tables<'quiz'> | undefined }) => {
  const { quiz_id, creator } = theQuiz ?? {};
  const { user_id } = useFetchCurrentUser().userData ?? {};
  const {
    data: [creatorData, quizzes]
  } = useCreatorNQuiz(creator ?? '');
  const router = useRouter();
  const { isCreatorOpen, events } = useHoverEvent();

  const deleteBtnProps = {
    item: 'quiz',
    item_id: quiz_id as string,
    queryKey: QUIZLIST_QUERY_KEY,
    containerClassName: 'w-10',
    btnContainerClassName: 'w-8 h-8',
    btnClassName: 'text-2xl cursor-pointer',
    hoverContainerClassName: 'w-14 h-8 p-1 -bottom-8 -left-6',
    hoverBtnClassName: 'text-sm',
    moreFunc: () => {
      alert('질문이 삭제되었습니다.');
      router.push('/quiz/solve');
    }
  };

  const creatorProps = {
    isCreatorOpen,
    creator: creatorData.user_id,
    avatar: creatorData.avatar,
    nickname: creatorData.nickname,
    quizzes
  };

  return (
    <div
      className={`relative ${user_id === creatorData.user_id ? 'w-8' : 'w-12'} ml-2 flex items-center`}
      {...events()}
    >
      {user_id === creatorData.user_id ? (
        <DeleteBtn {...deleteBtnProps} />
      ) : (
        <AvatarImage
          src={creatorData.avatar ?? ''}
          alt="quiz creator"
          size="2.5"
          className="pointer-events-none border-2"
        />
      )}
      <HoverCreator {...creatorProps} />
    </div>
  );
};

export default ShowCreator;
