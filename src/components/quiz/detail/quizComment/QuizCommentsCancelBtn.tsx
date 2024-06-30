'use client';

import { useEffect, useRef, useState } from 'react';
import { HiOutlineEllipsisVertical } from 'react-icons/hi2';

const QuizCommentsCancelBtn = () => {
  const [isCancleBtnOpen, setCancleBtnOpen] = useState(false);
  const cancelBtnRef = useRef<HTMLButtonElement | null>(null);

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

  return (
    <div>
      <button ref={cancelBtnRef} className="p-1 relative hover:rounded-full hover:border">
        <HiOutlineEllipsisVertical />
      </button>
      {isCancleBtnOpen && (
        <div className="w-14 h-10 border rounded-md absolute right-16 p-1 flex justify-center">
          <button className="hover:bg-gray-200 hover:w-full rounded">삭제</button>
        </div>
      )}
    </div>
  );
};

export default QuizCommentsCancelBtn;
