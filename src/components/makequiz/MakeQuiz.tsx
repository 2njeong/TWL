'use client';

import ReturnQuizType from './ReturnQuizType';
import { useAtom } from 'jotai';
import { submitQuizAction } from '@/app/quiz/makequiz/action';
import { useRef } from 'react';
import { answerAtom, editorContentAtom, candidatesAtom, quizTyper } from '@/atom/quizAtom';
import SubmitBtn from './SubmitBtn';
import Question from './Question';
import { useQueryClient } from '@tanstack/react-query';
import { QUIZLIST_QUERY_KEY } from '@/query/quiz/quizQueryKeys';
import { useFetchCurrentUser } from '@/query/useQueries/useAuthQuery';
import { QuizField, ZodErrObj } from '@/type/quizType';

const MakeQuiz = () => {
  const { userData } = useFetchCurrentUser();
  const [candidates, setCandidates] = useAtom(candidatesAtom);
  const [contentData, setContentData] = useAtom(editorContentAtom);
  const [answer, setAnswer] = useAtom(answerAtom);
  const [quizType] = useAtom(quizTyper);
  const formRef = useRef<HTMLFormElement>(null);
  const quueryClient = useQueryClient();
  const zodErrKeyArr: QuizField[] =
    quizType === '객관식' ? ['question', 'candidates', 'answer'] : ['question', 'content', 'answer'];

  const submitQuiz = async (data: FormData) => {
    const question = data.get('question');
    if (!question) {
      alert('질문을 입력해주세요.');
      return;
    }
    if (!answer || !answer.length) {
      alert(`정답을 알려주세요. 도움이 필요한 질문이라도 예상하는 답변을 남겨주세요!`);
      return;
    }
    if (quizType === '객관식') {
      if (candidates.length < 2 || candidates.length > 5) {
        alert('객관식 문항은 최소 2개 이상, 5개 이하여야 합니다.');
        return;
      }
    }

    const submitActionWithAnswer = submitQuizAction.bind(null, answer, contentData, quizType, userData?.user_id ?? '');
    const result = await submitActionWithAnswer(data);
    // console.log('result?.error =>', result?.error);

    const zodErrObj: ZodErrObj = result?.error;
    if (zodErrObj) {
      const errorMsgArr = zodErrKeyArr.reduce<string[]>((acc, cur) => {
        let errorMsg;
        switch (cur) {
          case 'candidates':
            errorMsg =
              zodErrObj['candidates'] &&
              (Object.values(zodErrObj['candidates'])[0] as { _errors: string[] })._errors.join();
            break;
          case 'answer':
            errorMsg =
              zodErrObj['answer'] && (Object.values(zodErrObj['answer'])[0] as { _errors: string[] })._errors.join();
            break;
          default:
            errorMsg = zodErrObj[cur]?._errors[0];
        }
        errorMsg && acc.push(errorMsg);
        return acc;
      }, []);
      // console.log('errorMsgArr =>', errorMsgArr);
      errorMsgArr.length && alert(errorMsgArr[0]);
      return;
    }
    quueryClient.invalidateQueries({ queryKey: [QUIZLIST_QUERY_KEY] });
    formRef.current?.reset();
    setCandidates([1]);
    setAnswer(null);
    setContentData(null);
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
