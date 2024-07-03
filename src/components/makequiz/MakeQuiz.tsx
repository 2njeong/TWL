'use client';

import ReturnQuizType from './ReturnQuizType';
import { useAtom } from 'jotai';
import { submitQuizAction } from '@/app/quiz/makequiz/action';
import { useRef, useState } from 'react';
import { answerAtom, editorContentAtom, candidatesAtom, quizTyper } from '@/atom/quizAtom';
import SubmitBtn from './SubmitBtn';
import Question from './Question';
import { useQueryClient } from '@tanstack/react-query';
import { QUIZLIST_QUERY_KEY } from '@/query/quiz/quizQueryKeys';
import { useFetchCurrentUser } from '@/query/useQueries/useAuthQuery';
import { MakeQuizZodErr, QuizField, QuizValidationErr, ZodErrObj } from '@/type/quizType';
import { ZodFormattedError } from 'zod';

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
    // const question = data.get('question');
    // if (!question) {
    //   alert('질문을 입력해주세요.');
    //   return;
    // }
    // if (!answer || answer.join() === '<p><br></p>' || !answer.length) {
    //   alert(`정답을 알려주세요. 도움이 필요한 질문이라도 예상하는 답변을 남겨주세요!`);
    //   return;
    // }
    // if (quizType === '객관식') {
    //   if (candidates.length < 2) {
    //     alert('객관식 문항은 최소 2개 이상이어야 합니다.');
    //     return;
    //   }
    // } else {
    //   if (!contentData || contentData === '<p><br></p>' || contentData.replace('<p>' || '</p>', '').trim()) {
    //     alert('문제의 내용을 알려주세요!');
    //     return;
    //   }
    // }
    const submitActionWithAnswer = submitQuizAction.bind(null, answer, contentData, quizType, userData?.user_id ?? '');
    const result = await submitActionWithAnswer(data);
    console.log('result?.error =>', result?.error);

    const zodErrObj: ZodErrObj = result?.error;
    if (zodErrObj) {
      const errorMsgArr = zodErrKeyArr.reduce<string[]>((acc, cur) => {
        const errorMsg = zodErrObj[cur]?._errors[0];
        errorMsg && acc.push(errorMsg);
        return acc;
      }, []);
      console.log('errorMsgArr =>', errorMsgArr);
      alert(errorMsgArr[0]);
      return;

      // let arr = []
      // for (const key of zodErrKeyArr) {
      //   console.log('zodErrObj[key] =>', zodErrObj[key]);
      //   arr.push(zodErrObj[key])
      // }
    }

    // const zodErrObj: ZodErrorObj = {
    //   question: { _errors: [''] } as ZodFormattedError<any, string>,
    //   candidates: { _errors: [''] } as ZodFormattedError<any, string>,
    //   content: { _errors: [''] } as ZodFormattedError<any, string>,
    //   answer: { _errors: [''] } as ZodFormattedError<any, string>
    // };
    // const resultErr = zodErrKeyArr.reduce((acc, cur) => {
    //   if (zodErrObj) {
    //     acc.push(zodErrObj[cur]._errors[0]);
    //   }
    //   return acc;
    // }, [] as string[]);
    // console.log(result?.error[question])
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
