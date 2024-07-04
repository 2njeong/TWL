import HotQuizList from '@/components/quiz/HotQuizList';
import QuizList from '@/components/quiz/QuizList';
import { Suspense } from 'react';

const QuizPage = async () => {
  return (
    <div className="h-screen flex flex-col items-center p-6 ">
      <div className="flex flex-col gap-8 w-full">
        <section className="w-full bg-beiOne">
          <h1 className="text-3xl font-bold">Hot Quiz</h1>
          <HotQuizList />
        </section>
        <section className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Quiz List</h1>
          <QuizList />
        </section>
      </div>
    </div>
  );
};

export default QuizPage;
