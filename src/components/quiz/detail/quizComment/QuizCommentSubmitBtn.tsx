'use client';

import { checkLoginAtom } from '@/atom/authAtom';
import { useAtom } from 'jotai';
import { Dispatch, RefObject, SetStateAction } from 'react';
import { useFormStatus } from 'react-dom';

const QuizCommentSubmitBtn = ({
  isCommentOpen,
  setCommentOpen,
  commentFormRef
}: {
  isCommentOpen: boolean;
  setCommentOpen: Dispatch<SetStateAction<boolean>>;
  commentFormRef: RefObject<HTMLFormElement> | null;
}) => {
  const { pending } = useFormStatus();
  const [isLoggedIn, _] = useAtom(checkLoginAtom);

  const handleCancleBtn = () => {
    setCommentOpen(false);
    commentFormRef?.current?.reset();
  };

  return (
    <>
      {isLoggedIn && isCommentOpen && (
        <div className="flex gap-2 items-center">
          <button className="border px-2 py-0.5 rounded-lg hover:bg-gray-100" onClick={handleCancleBtn}>
            취소
          </button>
          <button
            type="submit"
            disabled={pending}
            className={`border px-2 py-0.5 rounded-lg hover:bg-gray-100 ${pending ? 'opacity-30' : ''}`}
          >
            {pending ? '...제출' : '제출'}
          </button>
        </div>
      )}
    </>
  );
};

export default QuizCommentSubmitBtn;
