'use client';

import { answerAtom, candidatesAtom } from '@/atom/quizAtom';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { CiCirclePlus } from 'react-icons/ci';
import { MdCancel } from 'react-icons/md';

const MultipleQuiz = () => {
  const [candidates, setCandidates] = useAtom(candidatesAtom);
  const [answer, setAnswer] = useAtom(answerAtom);
  const [animating, setAnimating] = useState(false);

  const plusInputCount = () => {
    setCandidates((prev) => (prev.length < 5 ? [...prev, prev.length + 1] : prev));
  };

  const minusInputCount = (idx: number) => {
    const noAnswer = String(idx);
    if (!idx) setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
    }, 300);
    setCandidates((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== idx) : prev));
    setAnswer((prev) => (prev?.includes(noAnswer) ? prev.filter((item) => item !== noAnswer) : prev));
  };

  const handleAnswer = (idx: number) => {
    const newAnswer = String(idx);
    setAnswer((prev) =>
      prev ? (prev.includes(newAnswer) ? prev.filter((item) => item !== newAnswer) : [...prev, newAnswer]) : [newAnswer]
    );
  };

  return (
    <div className="w-full flex flex-col items-center gap-2">
      {candidates.map((item, idx) => (
        <div key={item} className="w-full flex flex-col items-center gap-2">
          <div className="flex gap-1 justify-center items-center w-full">
            <input
              placeholder={`보기 ${idx + 1}`}
              name="candidates"
              className={`${animating ? 'animate-vibration' : null} border w-[80%] p-1`}
            ></input>
            <div className="flex gap-2">
              <button formAction={() => minusInputCount(idx)} className="text-red-500">
                <MdCancel />
              </button>
              <button
                formAction={() => handleAnswer(idx)}
                className={`font-medium ${answer && answer.includes(String(idx)) ? 'opacity-1' : 'opacity-50'}`}
              >
                정답
              </button>
            </div>
          </div>
          <button
            className={`text-lg mx-auto ${idx + 1 < candidates.length ? 'hidden' : null}`}
            formAction={plusInputCount}
          >
            <CiCirclePlus />
          </button>
        </div>
      ))}
    </div>
  );
};

export default MultipleQuiz;
