import DeleteBtn from '@/components/utilComponents/DeleteBtn';
import OpenModalBtn from '@/components/utilComponents/modal/OpenModalBtn';
import { useGetCurrentUser } from '@/customHooks/common';
import { QUIZLIST_QUERY_KEY } from '@/query/quiz/quizQueryKeys';
import { Tables } from '@/type/database';
import { useRouter } from 'next/navigation';
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
  const { user_id } = useGetCurrentUser() ?? {};
  const router = useRouter();

  const deleteBtnProps = {
    item: 'quiz',
    item_id: theQuiz?.quiz_id as string,
    queryKey: QUIZLIST_QUERY_KEY,
    containerClassName: 'w-10',
    btnContainerClassName: 'w-8 h-8',
    btnClassName: 'text-2xl cursor-pointer',
    hoverContainerClassName: 'w-14 h-8 p-1 -bottom-8 -left-6',
    hoverBtnClassName: 'text-sm',
    moreFunc: () => {
      alert('질문이 삭제되었습니다.');
      router.push('/quiz/solve');
    }
  };

  return (
    <div className="w-4/5 flex flex-col gap-1">
      <div className="flex flex-col gap-2">
        <div className="w-full flex justify-between items-center">
          <h1 className="font-bold text-3xl">Q. {theQuiz?.question}</h1>
          {user_id === theQuiz?.creator && <DeleteBtn {...deleteBtnProps} />}
        </div>
        <div>
          {theQuiz && theQuiz.answer.length > 1 && (
            <h4 className="text-gray-600 text-sm">복수답변({theQuiz.answer.length}개) 질문입니다.</h4>
          )}
          {theQuiz?.needHelp && (
            <h2 className="text-gray-400 text-sm">
              도움이 필요한 질문입니다! 답변이 옳지 않을 수 있으니 함께 완성해주세요:)
            </h2>
          )}
        </div>
      </div>
      <div className="w-full flex justify-end items-start">
        <OpenModalBtn
          className="flex justify-center items-center w-[12%] max-sm:w-20 px-1 py-1 rounded-lg bg-green-500 hover:bg-green-400 text-white"
          modalProps={{
            elementId: 'root',
            type: 'alert',
            title: `${checkIfRight()}`,
            content: theQuiz?.isSubjective
              ? checkIfRight() === '정답을 입력해주세요.'
                ? ''
                : '주관식은 답변이 다를 수 있으니 출제자의 정확한 정답을 확인해보세요!'
              : `${checkIfRight() === '정답입니다!' ? '축하합니다. 다른 문제도 도전해보세요:)' : '404..'}`
          }}
          moreFunc={() => setClickList(new Array(theQuiz?.candidates?.length).fill(false))}
        >
          정답제출
        </OpenModalBtn>
      </div>
    </div>
  );
};

export default QuizHeader;
