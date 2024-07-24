'use client';

import QuizComments from '@/components/quiz/detail/quizComment/QuizComments';
import { useFetchThatQuiz } from '@/query/useQueries/useQuizQuery';
import { useEffect, useState } from 'react';
import QuizHeader from '@/components/quiz/detail/QuizHeader';
import QuizFooter from '@/components/quiz/detail/QuizFooter';
import dynamic from 'next/dynamic';
import { useFetchCurrentUser } from '@/query/useQueries/useAuthQuery';

const QuizContentWrapper = dynamic(() => import('@/components/quiz/detail/QuizContent'), { ssr: false });

const DetailQuizPage = ({ params: { id } }: { params: { id: string } }) => {
  const { data: theQuiz, isLoading } = useFetchThatQuiz(id);
  const [clickList, setClickList] = useState<boolean[]>([]);
  const [subjectiveAnswer, setSubjectiveAnswer] = useState('');
  const { isLoading: userDataLoading } = useFetchCurrentUser();

  useEffect(() => {
    if (theQuiz) {
      setClickList(new Array(theQuiz?.candidates?.length).fill(false));
    }
  }, [theQuiz]);

  const checkIfRight = () => {
    if (theQuiz?.isSubjective) {
      return subjectiveAnswer === '<p><br></p>'
        ? '정답을 입력해주세요.'
        : subjectiveAnswer === theQuiz.answer.join()
        ? '정답입니다!'
        : '정답을 확인해주세요.';
    } else {
      if (clickList.filter((click) => click).length < 1) {
        return '정답을 맞혀주세요!';
      }
      if (theQuiz?.answer.length === clickList.filter((click) => click).length) {
        if (theQuiz?.answer.every((answer: string) => clickList[Number(answer)])) {
          return '정답입니다!';
        } else {
          return '오답입니다.';
        }
      } else {
        if (theQuiz?.answer.length > clickList.filter((click) => click).length) {
          return `복수답변(${theQuiz?.answer.length}개) 질문입니다.`;
        } else {
          return `오답입니다. (정답: ${theQuiz?.answer.length}개)`;
        }
      }
    }
  };

  if (isLoading || userDataLoading) return <div>로딩중..</div>;

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="bg-yelTwo bg-clip-padding rounded-md border-4 border-dashed p-8">
        <div className="flex flex-col items-center gap-8 bg-white bg-opacity-60 max-sm:pt-6 pt-12 pb-10 px-4 rounded-lg">
          <QuizHeader theQuiz={theQuiz} setClickList={setClickList} checkIfRight={checkIfRight} />
          <QuizContentWrapper
            theQuiz={theQuiz}
            clickList={clickList}
            setClickList={setClickList}
            setSubjectiveAnswer={setSubjectiveAnswer}
          />
          <QuizFooter theQuiz={theQuiz} />
        </div>
      </div>
      <QuizComments theQuiz={theQuiz} />
    </div>
  );
};

export default DetailQuizPage;
