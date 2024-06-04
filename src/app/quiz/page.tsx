import QuizList from '@/components/quiz/QuizList';
import { Suspense } from 'react';

const QuizPage = () => {
  return (
    <>
      <Suspense>
        <QuizList />
      </Suspense>
    </>
  );
};

export default QuizPage;
