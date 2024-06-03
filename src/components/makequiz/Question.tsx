'use client';

import ReturnQuizType from './ReturnQuizType';
import { useAtom } from 'jotai';
import { submitAction } from '@/app/action';
import { useRef, useTransition } from 'react';
import { answerAtom, inputAtom, quizTyper } from '@/atom/quizAtom';
import SubmitBtn from './SubmitBtn';

const Question = () => {
  const [inputArr, setInputArr] = useAtom(inputAtom);
  const [answer, setAnswer] = useAtom(answerAtom);
  const [quizType] = useAtom(quizTyper);
  const formRef = useRef<HTMLFormElement>(null);

  const submitQuiz = async (data: FormData) => {
    console.log('inputArr.length =>', inputArr.length);
    console.log('typeOfAnswer => ', answer);

    if (quizType === '객관식') {
      if (inputArr.length < 2) {
        alert('객관식 문항은 최소 2개 이상이어야 합니다.');
        return;
      } else if (!answer || !answer.length) {
        alert('정답을 알려주세용');
        return;
      }
    } else {
      if (!data.get('candidates')) alert('답변을 입력해주세요.');
    }
    const submitActionWithAnswer = submitAction.bind(null, answer);
    await submitActionWithAnswer(data);
    formRef.current?.reset();
    setInputArr([1]);
    setAnswer(null);
  };

  return (
    <form action={submitQuiz} ref={formRef} className="w-4/6 flex flex-col gap-6">
      <section className="flex gap-1">
        <h1 className="font-bold text-4xl text-beiOne">Q.</h1>
        <input placeholder="질문을 입력해주세요!" name="question" className="w-full"></input>
      </section>
      <ReturnQuizType />
      <SubmitBtn />
    </form>
  );
};

export default Question;
