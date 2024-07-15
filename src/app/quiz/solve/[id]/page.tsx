'use client';

import QuizComments from '@/components/quiz/detail/quizComment/QuizComments';
import { useFetchThatQuiz } from '@/query/useQueries/useQuizQuery';
import { useEffect, useState } from 'react';
import QuizHeader from '@/components/quiz/detail/QuizHeader';
import QuizContent from '@/components/quiz/detail/QuizContent';
import QuizFooter from '@/components/quiz/detail/QuizFooter';
import { useFetchCurrentUser } from '@/query/useQueries/useAuthQuery';
import dynamic from 'next/dynamic';

const QuizContentWrapper = dynamic(() => import('@/components/quiz/detail/QuizContent'), { ssr: false });

const DetailQuizPage = ({ params: { id } }: { params: { id: string } }) => {
  const { data: theQuiz, isLoading } = useFetchThatQuiz(id);
  const { userData } = useFetchCurrentUser();
  const [clickList, setClickList] = useState<boolean[]>([]);
  const [subjectiveAnswer, setSubjectiveAnswer] = useState('');

  useEffect(() => {
    if (theQuiz) {
      setClickList(new Array(theQuiz?.candidates?.length).fill(false));
    }
  }, [theQuiz]);

  const checkIfRight = () => {
    // setClickList(new Array(theQuiz?.candidates?.length).fill(false));
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

  if (isLoading) return <div>로딩중..</div>;

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="bg-yelTwo flex flex-col gap-8 py-8 px-4">
        <QuizHeader theQuiz={theQuiz} setClickList={setClickList} checkIfRight={checkIfRight} />
        <QuizContentWrapper
          theQuiz={theQuiz}
          clickList={clickList}
          setClickList={setClickList}
          setSubjectiveAnswer={setSubjectiveAnswer}
        />
        <QuizFooter theQuiz={theQuiz} />
      </div>
      <QuizComments theQuiz={theQuiz} user_id={userData?.user_id} />
    </div>
  );
};

export default DetailQuizPage;
