import QuizList from '@/components/quiz/QuizList';
import { Suspense } from 'react';

const QuizPage = async () => {
  return (
    <>
      {/* <Suspense> */}
      <QuizList />
      {/* </Suspense> */}
    </>
  );
};

export default QuizPage;
