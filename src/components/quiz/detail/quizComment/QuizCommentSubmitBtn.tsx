'use client';

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

  const handleCancleBtn = () => {
    setCommentOpen(false);
    commentFormRef?.current?.reset();
  };

  return (
    <>
      {isCommentOpen && (
        <div className="flex gap-1 items-center">
          <button className="border" onClick={handleCancleBtn}>
            취소
          </button>
          <button type="submit" disabled={pending} className={`border ${pending ? 'opacity-30' : ''}`}>
            {pending ? '...제출' : '제출'}
          </button>
        </div>
      )}
    </>
  );
};

export default QuizCommentSubmitBtn;
