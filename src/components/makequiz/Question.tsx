'use client';

import ReturnQuizType from './ReturnQuizType';
import { useAtom } from 'jotai';
import { submitAction } from '@/app/action';
import { useRef } from 'react';
import { answerAtom, inputAtom, needHelpAtom, quizTyper } from '@/atom/quizAtom';
import SubmitBtn from './SubmitBtn';

const Question = () => {
  const [inputArr, setInputArr] = useAtom(inputAtom);
  const [answer, setAnswer] = useAtom(answerAtom);
  const [quizType] = useAtom(quizTyper);
  const [_, setNeedHelp] = useAtom(needHelpAtom);
  const formRef = useRef<HTMLFormElement>(null);

  const handleNeedAnswer = () => {
    setNeedHelp((prev) => !prev);
  };

  const submitQuiz = async (data: FormData) => {
    console.log('inputArr.length =>', inputArr.length);
    console.log('typeOfAnswer => ', answer);

    if (quizType === '객관식') {
      if (inputArr.length < 2) {
        alert('객관식 문항은 최소 2개 이상이어야 합니다.');
        return;
      } else if (!answer || !answer.length) {
        alert(`정답을 알려주세요. 도움이 필요한 질문이라도 예상하는 답변을 남겨주세요!`);
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
      <section className="flex flex-col gap-4 w-full">
        <div className="flex gap-1 items-center">
          <h1 className="font-bold text-4xl text-beiOne">Q.</h1>
          <input placeholder="질문을 입력해주세요!" name="question" className="w-full"></input>
        </div>
        <div className="flex gap-1">
          <input type="checkbox" name="needHelp" onChange={handleNeedAnswer}></input>
          <h6 className="text-sm text-gray-400">사실 저도 좀 헷갈리는 질문이에요. 같이 고민해보고 싶어요!</h6>
        </div>
      </section>
      <ReturnQuizType />
      <SubmitBtn />
    </form>
  );
};

export default Question;
