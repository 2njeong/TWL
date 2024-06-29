'use client';

import QuizComments from '@/components/quiz/detail/quizComment/QuizComments';
import { useQuizListQuery } from '@/query/useQueries/useQuizQuery';
import { Tables } from '@/type/database';
import { useEffect, useState } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import QuizHeader from '@/components/quiz/detail/QuizHeader';
import QuizContent from '@/components/quiz/detail/QuizContent';
import QuizFooter from '@/components/quiz/detail/QuizFooter';
import { useFetchCurrentUser } from '@/query/useQueries/useAuthQuery';

const DetailQuizPage = ({ params: { id } }: { params: { id: string } }) => {
  // console.log(id);
  const {
    data: quizList,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isRefetching,
    isLoading
  } = useQuizListQuery();
  const { userData } = useFetchCurrentUser();

  const theQuiz = quizList?.find((quiz: Tables<'quiz'>) => quiz.quiz_id === id);
  // console.log('theQuiz?.answer =>', theQuiz?.answer);

  const [clickList, setClickList] = useState<boolean[]>([]);
  const [subjectiveAnswer, setSubjectiveAnswer] = useState('');

  useEffect(() => {
    if (theQuiz) {
      setClickList(new Array(theQuiz?.candidates?.length).fill(false));
    }
  }, [theQuiz]);

  // console.log('subjectiveAnswer', subjectiveAnswer);
  // console.log('theQuiz.answer.join() =>', theQuiz?.answer.join());

  const checkIfRight = () => {
    if (theQuiz?.isSubjective) {
      return subjectiveAnswer === theQuiz.answer.join() ? '정답입니다!' : '정답을 확인해주세요.';
    } else {
      if (theQuiz?.answer.length === clickList.filter((click) => click).length) {
        if (theQuiz?.answer.every((answer: string) => clickList[Number(answer)])) {
          return '정답입니다!';
        } else {
          return '오답입니다.';
        }
      } else {
        return `복수답변(${theQuiz?.answer.length}개) 질문입니다.`;
      }
    }
  };

  if (isLoading) return;
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="bg-yelTwo flex flex-col gap-8 py-8 px-4">
        <QuizHeader theQuiz={theQuiz} setClickList={setClickList} checkIfRight={checkIfRight} />
        <QuizContent
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
