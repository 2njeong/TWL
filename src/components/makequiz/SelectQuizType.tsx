'use client';

import { answerAtom, inputAtom, quizTyper } from '@/atom/quizAtom';
import { useSetAtom } from 'jotai';

const SelectQuizType = () => {
  const quizTypeList = ['객관식', '주관식'];
  const setQuizType = useSetAtom(quizTyper);
  const setInputArr = useSetAtom(inputAtom);
  const setAnswer = useSetAtom(answerAtom);

  const handleQuizType = (type: string) => {
    setQuizType(type);
    setInputArr([1]);
    setAnswer(null);
  };

  return (
    <section className="w-full flex justify-end absolute -top-5">
      {quizTypeList.map((t) => (
        <button
          key={t}
          className={`${t === '객관식' ? 'bg-pinkOne' : 'bg-yelThree'} rounded`}
          onClick={() => handleQuizType(t)}
        >
          {t}
        </button>
      ))}
    </section>
  );
};

export default SelectQuizType;
