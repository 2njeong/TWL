'use client';

import { Dispatch, SetStateAction } from 'react';
import { useFormStatus } from 'react-dom';

const QuizCommentBtn = ({
  isCommentOpen,
  setCommentOpen
}: {
  isCommentOpen: boolean;
  setCommentOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { pending } = useFormStatus();

  return (
    <>
      {isCommentOpen && (
        <div className="flex gap-1 items-center">
          <button className="border" onClick={() => setCommentOpen(false)}>
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

export default QuizCommentBtn;
