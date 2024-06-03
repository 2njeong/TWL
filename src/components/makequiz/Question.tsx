'use client';

import ReturnQuizType from './ReturnQuizType';
import { useAtom } from 'jotai';
import { inputList } from '@/atom/quizAtom';
import { submitAction } from '@/app/action';
import { useRef } from 'react';

const Question = () => {
  const [inputArr] = useAtom(inputList);
  const formRef = useRef<HTMLFormElement>(null);

  const submitQuiz = async (data: FormData) => {
    if (inputArr.length < 2) {
      alert('객관식 문항은 최소 2개 이상이어야 합니다.');
      return;
    }
    await submitAction(data);
    formRef.current?.reset();
  };

  return (
    <form action={submitQuiz} ref={formRef} className="w-4/6 flex flex-col gap-6">
      <section className="flex gap-1">
        <h1 className="font-bold text-4xl text-beiOne">Q.</h1>
        <input placeholder="질문을 입력해주세요!" name="question" className="w-full"></input>
      </section>
      <ReturnQuizType />
    </form>
  );
};

export default Question;
