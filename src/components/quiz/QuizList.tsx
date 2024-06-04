'use client';

import { useQuizListQuery } from '@/customHooks/useQueries/useQuizQuery';
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

  console.log('quizList => ', quizList);
  //   console.log('hasNextPage =>', hasNextPage);

  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      fetchNextPage();
    }
  });

  return (
    <div className="scroll-y">
      {quizList?.map((quiz) => (
        <div key={quiz.quiz_id}>{quiz.question}</div>
      ))}
      <div className="h-screen"></div>
      <div className="bg-pink-400 w-[300px] h-[300px]" ref={ref}></div>
      <div className="h-[100px]"></div>
    </div>
  );
};

export default QuizList;
