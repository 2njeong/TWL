'use client';

import { useQuizListQuery } from '@/customHooks/useQueries/useQuizQuery';
import { useEffect, useState } from 'react';

const DetailQuizPage = ({ params }: { params: { id: string } }) => {
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

  const theQuiz = quizList?.find((quiz) => quiz.quiz_id === Number(params.id));
  console.log(theQuiz);
  console.log(theQuiz?.candidates.length);

  const [clickList, setClickList] = useState<boolean[]>([]);

  useEffect(() => {
    if (theQuiz) {
      setClickList(new Array(theQuiz?.candidates.length).fill(false));
    }
  }, [theQuiz]);

  const handleClick = (idx: number) => {
    setClickList((prev) => {
      const newClickList = [...prev];
      newClickList[idx] = !prev[idx];
      return newClickList;
    });
  };

  console.log('clickList =>', clickList);

  return (
    <div className="w-full bg-yelTwo flex flex-col gap-8">
      <div>
        {!theQuiz?.needHelp ? <h2>도움이 필요한 질문입니다! 답변이 옳지 않을 수 있으니 함께 완성해주세요:)</h2> : null}
        <h1>Q. {theQuiz?.question}</h1>
        {theQuiz && theQuiz.answer.length > 1 ? <h4>복수답변</h4> : null}
      </div>
      <div>
        {theQuiz?.isSubjective ? (
          <div></div>
        ) : (
          <div className="flex flex-col gap-4">
            {theQuiz?.candidates.map((candidate, idx) => (
              <button
                key={idx}
                className={`border ${clickList[idx] && 'bg-gray-200'}`}
                onClick={() => handleClick(idx)}
              >
                {candidate}
              </button>
            ))}
          </div>
        )}
      </div>
      <div>
        <button>정답보기</button>
      </div>
      <div>Comments()</div>
    </div>
  );
};

export default DetailQuizPage;
