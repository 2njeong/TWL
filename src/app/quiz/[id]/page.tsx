'use client';

import { openModal } from '@/atom/modalAtom';
import Modal from '@/components/utilComponents/Modal';
import { useQuizListQuery } from '@/customHooks/useQueries/useQuizQuery';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

const DetailQuizPage = ({ params }: { params: { id: string } }) => {
  const [_, handleOpenModal] = useAtom(openModal);
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

  return (
    <div className="w-full bg-yelTwo flex flex-col gap-8 p-2">
      <div className="flex flex-col gap-1">
        {!theQuiz?.needHelp ? (
          <h2 className="mb-2">도움이 필요한 질문입니다! 답변이 옳지 않을 수 있으니 함께 완성해주세요:)</h2>
        ) : null}
        <h1 className="font-bold text-3xl">Q. {theQuiz?.question}</h1>
        {theQuiz && theQuiz.answer.length > 1 && (
          <h4 className="text-gray-600 text-sm">복수답변({theQuiz.answer.length}개) 질문입니다.</h4>
        )}
        <button
          className="flex justify-end"
          onClick={() => {
            handleOpenModal({
              type: 'confirm',
              title: '정답은',
              content: `${theQuiz?.answer} 입니다.`,
              onFunc: () => {
                console.log('단단다');
              }
            });
          }}
        >
          정답보기
        </button>
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

      <div>Comments()</div>
    </div>
  );
};

export default DetailQuizPage;
