'use client';

import { deleteComment } from '@/app/quiz/solve/action';
import { QUIZ_COMMENTS_QUERY_KEY } from '@/query/quiz/quizQueryKeys';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { HiOutlineEllipsisVertical } from 'react-icons/hi2';

const QuizCommentsDeleteBtn = ({ comment_id }: { comment_id: string }) => {
  const [isCancleBtnOpen, setCancleBtnOpen] = useState(false);
  const cancelBtnRef = useRef<HTMLButtonElement | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleClickCancleBtn = (event: any) => {
      if (cancelBtnRef) {
        if (cancelBtnRef.current && !cancelBtnRef.current.contains(event.target)) {
          setCancleBtnOpen(false);
        } else if (cancelBtnRef.current && cancelBtnRef.current.contains(event.target)) {
          setCancleBtnOpen((prev) => !prev);
        }
      }
    };

    document.addEventListener('click', handleClickCancleBtn);

    return () => {
      document.removeEventListener('click', handleClickCancleBtn);
    };
  }, []);

  const handleDeleteComment = async (comment_id: string) => {
    await deleteComment(comment_id);
    queryClient.invalidateQueries({ queryKey: [QUIZ_COMMENTS_QUERY_KEY] });
  };

  return (
    <div>
      <button ref={cancelBtnRef} className="p-1 relative hover:rounded-full hover:border">
        <HiOutlineEllipsisVertical />
      </button>
      {isCancleBtnOpen && (
        <div className="w-14 h-8 border rounded-md absolute right-16 p-1 flex justify-center">
          <button
            className="hover:bg-gray-200 hover:w-full rounded"
            onClick={async () => await handleDeleteComment(comment_id)}
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizCommentsDeleteBtn;
