'use client';

import OpenModalBtn from '@/components/utilComponents/modal/OpenModalBtn';
import { QUIZLIKE_QUERY_KEY } from '@/query/quiz/quizQueryKeys';
import { useFetchThatQuizLike } from '@/query/useQueries/useQuizQuery';
import { Tables } from '@/type/database';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const LikeQuizWrapper = dynamic(() => import('@/components/utilComponents/LikeQuiz'), { ssr: false });
const ShowCreatorWrapper = dynamic(() => import('@/components/quiz/detail/ShowCreator'), { ssr: false });

const QuizFooter = ({ theQuiz }: { theQuiz: Tables<'quiz'> | undefined }) => {
  const { data: quizLikeData } = useFetchThatQuizLike(theQuiz?.quiz_id || '');
  // console.log('이 theQuiz =>', theQuiz);

  const likeQuizProps = {
    quiz_id: theQuiz?.quiz_id,
    quizLikeUsers: quizLikeData.users,
    queryKey: [QUIZLIKE_QUERY_KEY, theQuiz?.quiz_id]
  };
  return (
    <div className="flex items-center justify-between">
      <OpenModalBtn
        className=""
        modalProps={{
          elementId: 'root',
          type: 'confirm',
          title: '정답은',
          content: theQuiz?.isSubjective
            ? theQuiz.answer[0]
            : `보기 ${theQuiz?.answer.map((item: string) => Number(item) + 1).join(', ')}번 입니다.`
        }}
      >
        바로 정답보기
      </OpenModalBtn>
      <Suspense>
        <div className="flex gap-4 items-center">
          <LikeQuizWrapper {...likeQuizProps} />
          <ShowCreatorWrapper creator={`${theQuiz?.creator}`} />
        </div>
      </Suspense>
    </div>
  );
};

export default QuizFooter;
