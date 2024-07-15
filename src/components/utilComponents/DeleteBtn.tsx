'use client';

import { deleteItem } from '@/app/quiz/solve/action';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { HiOutlineEllipsisVertical } from 'react-icons/hi2';

type DelteBtnProps = {
  item: string;
  item_id: string;
  additionalKey?: (string | number)[];
  queryKey: string;
  containerClassName?: string;
  btnContainerClassName?: string;
  btnClassName?: string;
  hoverContainerClassName?: string;
  hoverBtnClassName?: string;
};

const DeleteBtn = (deleteBtnProps: DelteBtnProps) => {
  const {
    item,
    item_id,
    queryKey,
    additionalKey,
    containerClassName,
    btnContainerClassName,
    btnClassName,
    hoverContainerClassName,
    hoverBtnClassName
  } = deleteBtnProps;
  const [isCancelBtnOpen, setCancelBtnOpen] = useState(false);
  const cancelBtnRef = useRef<HTMLButtonElement | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleClickCancleBtn = (event: any) => {
      if (cancelBtnRef) {
        if (cancelBtnRef.current && !cancelBtnRef.current.contains(event.target)) {
          setCancelBtnOpen(false);
        } else if (cancelBtnRef.current && cancelBtnRef.current.contains(event.target)) {
          setCancelBtnOpen((prev) => !prev);
        }
      }
    };

    document.addEventListener('click', handleClickCancleBtn);

    return () => {
      document.removeEventListener('click', handleClickCancleBtn);
    };
  }, []);

  const handleDeleteComment = async (item_id: string) => {
    await deleteItem(item, item_id);
    queryClient.invalidateQueries({ queryKey: additionalKey ? [queryKey, ...additionalKey] : [queryKey] });
  };

  return (
    <div className={`relative ${containerClassName || ''}`}>
      <button
        ref={cancelBtnRef}
        className={`flex justify-center items-center hover:rounded-full hover:border ${btnContainerClassName || ''}`}
      >
        <HiOutlineEllipsisVertical className={`${btnClassName || ''}`} />
      </button>
      {isCancelBtnOpen && (
        <div className={`border rounded-md absolute flex justify-center bg-white ${hoverContainerClassName || ''}`}>
          <button
            className={`hover:bg-gray-200 hover:w-full rounded ${hoverBtnClassName || ''}`}
            onClick={async () => await handleDeleteComment(item_id)}
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteBtn;
