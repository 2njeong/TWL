'use client';

import { quizTyper } from '@/atom/quizAtom';
import { useAtom } from 'jotai';
import SelectInput from './SelectInput';

const ReturnQuizType = () => {
  const [quizType] = useAtom(quizTyper);

  return quizType === '객관식' ? <SelectInput /> : <></>;
};

export default ReturnQuizType;
