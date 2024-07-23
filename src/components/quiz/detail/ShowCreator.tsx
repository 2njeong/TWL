'use client';

import AvatarImage from '@/components/member/information/AvatarImage';
import DeleteBtn from '@/components/utilComponents/DeleteBtn';
import { ZINDEX } from '@/constants/commonConstants';
import { QUIZLIST_QUERY_KEY } from '@/query/quiz/quizQueryKeys';
import { useFetchCurrentUser } from '@/query/useQueries/useAuthQuery';
import { useCreatorNQuiz } from '@/query/useQueries/useQuizQuery';
import { Tables } from '@/type/database';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ShowCreator = ({ theQuiz }: { theQuiz: Tables<'quiz'> | undefined }) => {
  const { quiz_id, creator } = theQuiz ?? {};
  const { user_id } = useFetchCurrentUser().userData ?? {};
  const {
    data: [creatorData, quizzes]
  } = useCreatorNQuiz(creator ?? '');
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const router = useRouter();

  const handleMouseEnter = () => {
    user_id !== creatorData.user_id && setIsCreatorOpen(true);
  };

  const handleMouseLeave = () => {
    user_id !== creatorData.user_id && setIsCreatorOpen(false);
  };

  const handleTouchMove = (e: React.TouchEvent<Element>) => user_id !== creatorData.user_id && setIsCreatorOpen(!!e);

  const events = () => ({
    onMouseEnter: () => handleMouseEnter(),
    onMouseLeave: () => handleMouseLeave(),
    onTouchMove: (e: React.TouchEvent<Element>) => handleTouchMove(e)
  });

  const openNewWindow = (creator_id: string) => {
    const features =
      'width=1400,height=700,resizable=yes,scrollbars=no,status=yes,toolbar=no,menubar=no,location=yes, noopener, noreferrer';
    window.open(`/member/${creator_id}`, '_blank', features);
  };

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
      {isCreatorOpen && (
        <div className={`absolute translate-x-[30%] -translate-y-[40%] flex drop-shadow-xl z-[${ZINDEX.hoverZ}]`}>
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
      {/* <AvatarImage
        src={creatorData.avatar ?? ''}
        alt="quiz creator"
        size="2.5"
        className="pointer-events-none border-2"
      />
      {user_id !== creatorData.user_id && isCreatorOpen && (
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
      )} */}
    </div>
  );
};

export default ShowCreator;
