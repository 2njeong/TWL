import HotQuiz from '@/components/quiz/solve/HotQuiz';
import QuizList from '@/components/quiz/solve/QuizList';
import QuizSearch from '@/components/quiz/solve/QuizSearch';
import { ZINDEX } from '@/constants/commonConstants';
import Image from 'next/image';

const QuizPage = () => {
  return (
    <div className="h-full flex flex-col items-center p-6 ">
      <div className="flex flex-col gap-8 w-full">
        <section className="w-full relative h-full min-h-72 flex justify-center items-center">
          <Image
            src="/banner3.png"
            alt="질문 배너"
            fill={true}
            sizes="900px"
            priority={true}
            className={`object-cover w-full h-full rounded`}
            style={{ zIndex: ZINDEX.hotQuizZ - 1 }}
          />
          <div className="w-full h-[70%]" style={{ zIndex: ZINDEX.hotQuizZ }}>
            <HotQuiz />
          </div>
        </section>
        <QuizSearch />
        <section className="w-full flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Quiz List</h1>
          <QuizList />
        </section>
      </div>
    </div>
  );
};

export default QuizPage;
