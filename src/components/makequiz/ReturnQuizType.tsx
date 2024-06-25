'use client';

import { quizTyper } from '@/atom/quizAtom';
import { useAtom } from 'jotai';
import MultipleQuiz from './MutipleQuiz';
import dynamic from 'next/dynamic';

const SubjectiveQuizWrapper = dynamic(() => import('./SubjectiveType'), { ssr: false });

const ReturnQuizType = () => {
  const [quizType] = useAtom(quizTyper);
  console.log('quizType =>', quizType);

  return (
    <>
      <section className="w-full">{quizType === '객관식' ? <MultipleQuiz /> : <SubjectiveQuizWrapper />}</section>
    </>
  );
};

export default ReturnQuizType;
