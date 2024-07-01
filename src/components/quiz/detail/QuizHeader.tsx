import OpenModalBtn from '@/components/utilComponents/modal/OpenModalBtn';
import { Tables } from '@/type/database';
import { Dispatch, SetStateAction } from 'react';

const QuizHeader = ({
  theQuiz,
  setClickList,
  checkIfRight
}: {
  theQuiz: Tables<'quiz'> | undefined;
  setClickList: Dispatch<SetStateAction<boolean[]>>;
  checkIfRight: () => string | undefined;
}) => {
  return (
    <div className="flex flex-col gap-1">
      {theQuiz?.needHelp && (
        <h2 className="mb-2">도움이 필요한 질문입니다! 답변이 옳지 않을 수 있으니 함께 완성해주세요:)</h2>
      )}
      <h1 className="font-bold text-3xl">Q. {theQuiz?.question}</h1>
      {theQuiz && theQuiz.answer.length > 1 && (
        <h4 className="text-gray-600 text-sm">복수답변({theQuiz.answer.length}개) 질문입니다.</h4>
      )}
      <OpenModalBtn
        className="flex justify-end"
        modalProps={{
          type: 'alert',
          title: `${checkIfRight()}`,
          content: theQuiz?.isSubjective
            ? '주관식은 답변이 다를 수 있으니 출제자의 정확한 정답을 확인해보세요!'
            : `${checkIfRight() === '정답입니다!' ? '축하합니다. 다른 문제도 도전해보세요:)' : '404..'}`
        }}
        moreFunc={() => setClickList(new Array(theQuiz?.candidates?.length).fill(false))}
      >
        정답제출
      </OpenModalBtn>
    </div>
  );
};

export default QuizHeader;
