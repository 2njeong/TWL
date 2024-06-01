'use client';

import { quizTyper } from '@/atom/quizAtom';
import { useAtom } from 'jotai';

const SelectQuizType = () => {
  const quizTypeList = ['객관식', '주관식'];
  const [_, setQuizType] = useAtom(quizTyper);
  console.log(_);

  const handleQuizType = (type: string) => {
    setQuizType(type);
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
