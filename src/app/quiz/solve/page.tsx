import HotQuizList from '@/components/quiz/solve/HotQuizList';
import QuizList from '@/components/quiz/solve/QuizList';

const QuizPage = async () => {
  return (
    <div className="h-screen flex flex-col items-center p-6 ">
      <div className="flex flex-col gap-8 w-full">
        <section className="w-full bg-beiOne">
          <h1 className="text-3xl font-bold">Hot Quiz(좋아요 많은 순 - 나열 갯수 수정가능)</h1>
          <HotQuizList />
        </section>
        <section className="w-full flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Quiz List(전체 문제들 - 무한스크롤)</h1>
          <QuizList />
        </section>
      </div>
    </div>
  );
};

export default QuizPage;
