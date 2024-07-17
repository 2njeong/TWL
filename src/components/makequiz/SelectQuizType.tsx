'use client';

import { answerAtom, candidatesAtom, quizTyper } from '@/atom/quizAtom';
import { useAtom, useSetAtom } from 'jotai';

const SelectQuizType = () => {
  const quizTypeList = ['객관식', '주관식'];
  const [quizType, setQuizType] = useAtom(quizTyper);
  const setCandidates = useSetAtom(candidatesAtom);
  const setAnswer = useSetAtom(answerAtom);

  const handleQuizType = (type: string) => {
    setQuizType(type);
    setCandidates([1]);
    setAnswer(null);
  };

  console.log('quizType =>', quizType);

  return (
    <section className="w-full flex justify-end absolute top-0 transform -translate-y-full">
      <div className="px-1 w-32 flex relative">
        {quizTypeList.map((t, i) => (
          <button
            key={t}
            className={`${i === 0 ? 'bg-red-300' : 'bg-green-300'} ${
              quizType === '객관식'
                ? i === 0
                  ? 'absolute w-16'
                  : 'w-full justify-end'
                : i === 0
                ? 'w-full justify-start'
                : 'absolute w-16 trasform translate-x-[90%]'
            } flex items-center rounded px-2 py-1`}
            onClick={() => handleQuizType(t)}
          >
            {t}
          </button>
        ))}
      </div>
    </section>
  );
};

export default SelectQuizType;
