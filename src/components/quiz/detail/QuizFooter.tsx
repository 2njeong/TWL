'use client';

import OpenModalBtn from '@/components/utilComponents/modal/OpenModalBtn';
import { Tables } from '@/type/database';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const LikeQuizWrapper = dynamic(() => import('@/components/quiz/detail/LikeQuiz'), { ssr: false });
const ShowCreatorWrapper = dynamic(() => import('@/components/quiz/detail/ShowCreator'), { ssr: false });

const QuizFooter = ({ theQuiz }: { theQuiz: Tables<'quiz'> | undefined }) => {
  // console.log('이 theQuiz =>', theQuiz);
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
          <LikeQuizWrapper quiz_id={`${theQuiz?.quiz_id}`} />
          <ShowCreatorWrapper creator={`${theQuiz?.creator}`} />
        </div>
      </Suspense>
    </div>
  );
};

export default QuizFooter;
