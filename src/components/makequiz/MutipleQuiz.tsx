'use client';

import { answerAtom, inputAtom } from '@/atom/quizAtom';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { CiCirclePlus } from 'react-icons/ci';
import { MdCancel } from 'react-icons/md';

const MultipleQuiz = () => {
  const [inputArr, setInputArr] = useAtom(inputAtom);
  const [answer, setAnswer] = useAtom(answerAtom);
  const [animating, setAnimating] = useState(false);
  // console.log('inputArr =>', inputArr);
  // console.log('answer =>', answer);
  // console.log('animating =>', animating);

  const plusInputCount = () => {
    setInputArr((prev) => (prev.length < 5 ? [...prev, prev.length + 1] : prev));
  };

  const minusInputCount = (idx: number) => {
    const noAnswer = String(idx);
    if (!idx) setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
    }, 300);
    setInputArr((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== idx) : prev));
    setAnswer((prev) => (prev?.includes(noAnswer) ? prev.filter((item) => item !== noAnswer) : prev));
  };

  const handleAnswer = (idx: number) => {
    const newAnswer = String(idx);
    setAnswer((prev) =>
      prev ? (prev.includes(newAnswer) ? prev.filter((item) => item !== newAnswer) : [...prev, newAnswer]) : [newAnswer]
    );
  };

  return (
    <div className="flex flex-col gap-2">
      {inputArr.map((item, idx) => (
        <div key={item} className="flex flex-col gap-2">
          <div className="flex gap-1 items-center w-full">
            <input
              placeholder={`보기 ${idx + 1}`}
              name="candidates"
              className={`${animating ? 'animate-vibration' : null} border w-10/12`}
            ></input>
            <div className="flex gap-2">
              <button formAction={() => minusInputCount(idx)}>
                <MdCancel />
              </button>
              <button
                formAction={() => handleAnswer(idx)}
                className={`opacity-${answer && answer.includes(String(idx)) ? '1' : '50'}`}
              >
                정답
              </button>
            </div>
          </div>
          <button className={`mx-auto ${idx + 1 < inputArr.length ? 'hidden' : null}`} formAction={plusInputCount}>
            <CiCirclePlus />
          </button>
        </div>
      ))}
    </div>
  );
};

export default MultipleQuiz;
