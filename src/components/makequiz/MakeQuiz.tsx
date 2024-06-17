'use client';

import ReturnQuizType from './ReturnQuizType';
import { useAtom } from 'jotai';
import { submitQuizAction } from '@/app/action';
import { useRef } from 'react';
import { answerAtom, inputAtom, quizTyper } from '@/atom/quizAtom';
import SubmitBtn from './SubmitBtn';
import Question from './Question';
import { useQuizListQuery } from '@/customHooks/useQueries/useQuizQuery';

const MakeQuiz = () => {
  const [inputArr, setInputArr] = useAtom(inputAtom);
  const [answer, setAnswer] = useAtom(answerAtom);
  const [quizType] = useAtom(quizTyper);
  const formRef = useRef<HTMLFormElement>(null);
  // const { mutate: addNewQuiz } = useAddQuiz();

  const { data: quizList } = useQuizListQuery();

  const submitQuiz = async (data: FormData) => {
    // console.log('inputArr.length =>', inputArr.length);
    // console.log('typeOfAnswer => ', answer);

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
    const submitActionWithAnswer = submitQuizAction.bind(null, answer);
    await submitActionWithAnswer(data);
    // await addNewQuiz({ answer, data });
    formRef.current?.reset();
    setInputArr([1]);
    setAnswer(null);
  };

  return (
    <>
      <form action={submitQuiz} ref={formRef} className="w-4/6 flex flex-col gap-6">
        <Question />
        <ReturnQuizType />
        <SubmitBtn />
      </form>
    </>
  );
};

export default MakeQuiz;
