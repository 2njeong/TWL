'use client';

import { needHelpAtom } from '@/atom/quizAtom';
import { useSetAtom } from 'jotai';

const Question = () => {
  const setNeedHelp = useSetAtom(needHelpAtom);

  const handleNeedAnswer = () => {
    setNeedHelp((prev) => !prev);
  };
  return (
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
  );
};

export default Question;
