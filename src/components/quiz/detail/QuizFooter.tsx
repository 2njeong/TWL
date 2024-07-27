'use client';

import { updateAtom } from '@/atom/quizAtom';
import OpenModalBtn from '@/components/utilComponents/modal/OpenModalBtn';
import { QUIZLIKE_QUERY_KEY, THAT_QUIZ_QUERY_KEY } from '@/query/quiz/quizQueryKeys';
import { useFetchThatQuizLike } from '@/query/useQueries/useQuizQuery';
import { Tables } from '@/type/database';
import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const LikeQuizWrapper = dynamic(() => import('@/components/utilComponents/LikeQuiz'), { ssr: false });
const ShowCreatorWrapper = dynamic(() => import('@/components/quiz/detail/ShowCreator'), { ssr: false });

const QuizFooter = ({ theQuiz }: { theQuiz: Tables<'quiz'> | undefined }) => {
  const { data: quizLikeData } = useFetchThatQuizLike(theQuiz?.quiz_id || '');
  const [onUpdate, _] = useAtom(updateAtom);

  const likeQuizProps = {
    quiz_id: theQuiz?.quiz_id,
    creator: theQuiz?.creator,
    quizLikeUsers: quizLikeData.users,
    queryKey: [QUIZLIKE_QUERY_KEY, theQuiz?.quiz_id]
  };
  return (
    <div className="w-4/5 flex items-center justify-between">
      <OpenModalBtn
        className="flex justify-center items-center w-[12%] max-sm:w-20 px-1 py-1 rounded-lg bg-blue-500 hover:bg-blue-400 text-white"
        modalProps={{
          elementId: 'root',
          type: 'alert',
          item: 'quiz',
          item_id: theQuiz?.quiz_id,
          queryKey: [THAT_QUIZ_QUERY_KEY, theQuiz?.quiz_id],
          title: onUpdate ? '수정할 정답은..' : '정답은',
          content: theQuiz?.isSubjective
            ? theQuiz.answer[0]
            : `보기 ${theQuiz?.answer.map((item: string) => Number(item) + 1).join(', ')}번 입니다.`
        }}
      >
        정답보기
      </OpenModalBtn>
      <Suspense>
        <div className="flex gap-2 items-center">
          <LikeQuizWrapper {...likeQuizProps} />
          <ShowCreatorWrapper theQuiz={theQuiz} />
        </div>
      </Suspense>
    </div>
  );
};

export default QuizFooter;
