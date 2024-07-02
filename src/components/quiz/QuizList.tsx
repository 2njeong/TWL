'use client';

import { useQuizListQuery } from '@/query/useQueries/useQuizQuery';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

const QuizList = () => {
  const {
    data: quizList,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isRefetching
  } = useQuizListQuery();

  // console.log('quizList => ', quizList);
  // console.log('hasNextPage =>', hasNextPage);

  const { ref } = useInView({
    threshold: 0.5,
    onChange: (inView) => {
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      fetchNextPage();
    }
  });

  return (
    <div className="flex flex-col w-full">
      {quizList?.map((quiz) => (
        <div key={quiz.quiz_id} className="border-b flex items-start">
          <Link href={`/quiz/solve/${quiz.quiz_id}`}>{quiz.question}</Link>
        </div>
      ))}
      <div ref={ref} className="w-96 h-28 flex justify-center items-center mx-auto">
        {isFetchingNextPage && <p>로딩중...</p>}
      </div>
    </div>
  );
};

export default QuizList;
