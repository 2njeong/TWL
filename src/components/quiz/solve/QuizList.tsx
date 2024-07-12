'use client';

import OpenModalBtn from '@/components/utilComponents/modal/OpenModalBtn';
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
    isRefetching,
    isLoading
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
      {isLoading ? (
        <div className="w-96 h-28 flex justify-center items-center mx-auto">
          <p>로딩중...</p>
        </div>
      ) : quizList?.length ? (
        quizList.map((quiz) => (
          <div key={quiz.quiz_id} className="w-full border-b flex items-start">
            <Link href={`/quiz/solve/${quiz.quiz_id}`}>{quiz.question}</Link>
          </div>
        ))
      ) : (
        <div className="w-full h-48 flex flex-col justify-center items-center text-gray-500">
          <p>아직 출제된 문제가 없습니다.</p>
          <p>여러분의 지식과 고민을 공유해보세요!</p>
        </div>
      )}
      <div ref={ref} className="w-3/6 h-28 flex justify-center items-center mx-auto">
        {isFetchingNextPage && <p>로딩중...</p>}
      </div>
    </div>
  );
};

export default QuizList;
