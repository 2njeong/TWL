'use client';

import { quizTyper } from '@/atom/quizAtom';
import { useAtom } from 'jotai';
import MultipleQuiz from './MutipleQuiz';
import SubjectiveQuiz from './SubjectiveType';

const ReturnQuizType = () => {
  const [quizType] = useAtom(quizTyper);

  return (
    <>
      <section className="w-full">{quizType === '객관식' ? <MultipleQuiz /> : <SubjectiveQuiz />}</section>
    </>
  );
};

export default ReturnQuizType;
