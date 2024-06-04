import QuizList from '@/components/quiz/QuizList';
import { Suspense } from 'react';

const QuizPage = async () => {
  return (
    <div className="w-full h-screen scroll-y flex flex-col items-center">
      <div className="w-full max-w-[1000px]">
        <section>
          <h1 className="text-3xl font-bold">Hot Quiz</h1>
          <div></div>
        </section>
        <section className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Quiz List</h1>
          {/* <Suspense> */}
          <QuizList />
          {/* </Suspense> */}
        </section>
      </div>
    </div>
  );
};

export default QuizPage;
