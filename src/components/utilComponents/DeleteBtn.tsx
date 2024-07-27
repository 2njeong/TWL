'use client';

import { deleteItem } from '@/app/quiz/solve/action';
import { updateAtom } from '@/atom/quizAtom';
import { useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { HiOutlineEllipsisVertical } from 'react-icons/hi2';

type DelteBtnProps = {
  item: string;
  item_id: string;
  type?: string;
  additionalKey?: (string | number)[];
  queryKey: string;
  containerClassName?: string;
  btnContainerClassName?: string;
  btnClassName?: string;
  hoverContainerClassName?: string;
  hoverBtnClassName?: string;
  moreFunc?: any;
};

const DeleteBtn = (deleteBtnProps: DelteBtnProps) => {
  const {
    item,
    item_id,
    type,
    queryKey,
    additionalKey,
    containerClassName,
    btnContainerClassName,
    btnClassName,
    hoverContainerClassName,
    hoverBtnClassName,
    moreFunc
  } = deleteBtnProps;
  const [onUpdate, setOnUpdate] = useAtom(updateAtom);
  const [isCancelBtnOpen, setCancelBtnOpen] = useState(false);
  const cancelBtnRef = useRef<HTMLButtonElement | null>(null);
  const queryClient = useQueryClient();

  console.log('onUpdate =>', onUpdate);

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

  const handleDelete = async (item_id: string) => {
    await deleteItem(item, item_id);
    queryClient.invalidateQueries({ queryKey: additionalKey ? [queryKey, ...additionalKey] : [queryKey] });
    moreFunc && moreFunc();
  };

  const changeOnUpdate = () => {
    setOnUpdate((prev) => !prev);
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
            className={`hover:bg-gray-200 hover:w-[90%] rounded ${hoverBtnClassName || ''}`}
            onClick={async () => await handleDelete(item_id)}
          >
            삭제
          </button>
          {type === 'plusModify' && (
            <button
              className={`hover:bg-gray-200 hover:w-[90%] rounded ${hoverBtnClassName || ''}`}
              onClick={changeOnUpdate}
            >
              수정
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default DeleteBtn;
