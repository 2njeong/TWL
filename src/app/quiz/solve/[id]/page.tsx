'use client';

import { openModal } from '@/atom/modalAtom';
import OpenModalBtn from '@/components/utilComponents/modal/OpenModalBtn';
import { useQuizListQuery } from '@/customHooks/useQueries/useQuizQuery';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

const DetailQuizPage = ({ params: { id } }: { params: { id: string } }) => {
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

  const theQuiz = quizList?.find((quiz) => quiz.quiz_id === id);
  console.log('theQuiz?.answer =>', theQuiz?.answer);

  const [clickList, setClickList] = useState<boolean[]>([]);
  console.log(clickList);

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

  const checkIfRight = () => {
    if (theQuiz?.answer.length === clickList.filter((click) => click).length) {
      if (theQuiz?.answer.every((answer) => clickList[Number(answer)])) {
        return '정답입니다!';
      } else {
        return '오답입니다.';
      }
    } else {
      return `복수답변(${theQuiz?.answer.length}개) 질문입니다.`;
    }
  };

  return (
    <div className="w-full bg-yelTwo flex flex-col gap-8 py-8 px-4">
      <div className="flex flex-col gap-1">
        {theQuiz?.needHelp && (
          <h2 className="mb-2">도움이 필요한 질문입니다! 답변이 옳지 않을 수 있으니 함께 완성해주세요:)</h2>
        )}
        <h1 className="font-bold text-3xl">Q. {theQuiz?.question}</h1>
        {theQuiz && theQuiz.answer.length > 1 && (
          <h4 className="text-gray-600 text-sm">복수답변({theQuiz.answer.length}개) 질문입니다.</h4>
        )}
        <OpenModalBtn
          modalProps={{
            type: 'alert',
            title: `${checkIfRight()}`,
            content: `${checkIfRight() === '정답입니다!' ? '축하합니다. 다른 문제도 도전해보세요:)' : '404..'}`
          }}
          moreFunc={() => setClickList(new Array(theQuiz?.candidates.length).fill(false))}
          className="flex justify-end"
        >
          정답제출
        </OpenModalBtn>
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
      <OpenModalBtn
        className="flex justify-end"
        modalProps={{
          type: 'confirm',
          title: '정답은',
          content: `${theQuiz?.answer} 입니다.`,
          onFunc: () => {
            console.log('단단다');
          }
        }}
      >
        바로 정답보기
      </OpenModalBtn>
      <button onClick={() => {}}>좋아요</button>
      <div>Comments()</div>
    </div>
  );
};

export default DetailQuizPage;
