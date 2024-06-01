'use client';

import { quizTyper } from '@/atom/quizAtom';
import { useAtom } from 'jotai';
import MultipleType from './MutipleType';
import SubjectiveType from './SubjectiveType';

const ReturnQuizType = () => {
  const [quizType] = useAtom(quizTyper);

  return <section>{quizType === '객관식' ? <MultipleType /> : <SubjectiveType />}</section>;
};

export default ReturnQuizType;
