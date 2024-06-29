'use client';

import { useFormStatus } from 'react-dom';

const QuizCommentBtn = ({ isCommentOpen }: { isCommentOpen: boolean }) => {
  const { pending } = useFormStatus();
  return (
    <>
      {isCommentOpen && (
        <div className="flex gap-1 items-center">
          <button className="border">취소</button>
          <button type="submit" disabled={pending} className={`border ${pending ? 'opacity-30' : ''}`}>
            {pending ? '...제출' : '제출'}
          </button>
        </div>
      )}
    </>
  );
};

export default QuizCommentBtn;
