'use client';

import { updateAtom } from '@/atom/quizAtom';
import DeleteBtn from '@/components/utilComponents/DeleteBtn';
import OpenModalBtn from '@/components/utilComponents/modal/OpenModalBtn';
import { useGetCurrentUser } from '@/customHooks/common';
import { ALGORITHM_OF_THATUSER } from '@/query/member/memberQueryKey';
import { Tables } from '@/type/database';
import { htmlTagRegex } from '@/utils/common';
import { getformattedDate } from '@/utils/utilFns';
import { Viewer } from '@toast-ui/react-editor';
import { useAtom } from 'jotai';
import Link from 'next/link';

const SingleAlgorithm = ({ item }: { item: Tables<'algorithm'> }) => {
  const [onUpdate, _] = useAtom(updateAtom);
  const { user_id: currentUser } = useGetCurrentUser() || {};

  const deleteBtnProps = {
    item: 'algorithm',
    item_id: item.algorithm_id,
    type: '+update',
    queryKey: ALGORITHM_OF_THATUSER,
    containerClassName: 'w-6',
    btnContainerClassName: 'w-6 h-6',
    btnClassName: 'text-sm cursor-pointer',
    hoverContainerClassName: 'w-14 h-14 p-1 -bottom-14 -left-6 flex flex-col items-center gap-1',
    hoverBtnClassName: 'text-sm'
  };
  return (
    <div
      key={item.algorithm_id}
      className="flex flex-col py-2 px-4 h-48 justify-between rounded border-2 border-dashed border-red-300"
    >
      <div className="flex flex-col gap-1">
        <div className="w-full flex justify-between">
          <h2 className="font-bold text-xl truncate">{item.title}</h2>
          {item.creator === currentUser && <DeleteBtn {...deleteBtnProps} />}
        </div>

        <div className="flex gap-1 items-center">
          <p className="font-semibold">Lv.</p>
          <p className="text-blue-500">{item.level}</p>
        </div>
        <div className="w-full flex justify-between items-center">
          <OpenModalBtn
            className="border border-red-200 bg-white hover:bg-red-100 rounded text-sm flex justify-start items-center px-2"
            modalProps={{
              elementId: 'new-root',
              item: 'algorithm',
              item_id: item.algorithm_id,
              updateItem: 'explanation',
              type: 'alert',
              title: '제 풀이는요..',
              content: item.explanation
            }}
          >
            <p>{onUpdate.item_id === item.algorithm_id && onUpdate.update ? '풀이수정' : '풀이'}</p>
          </OpenModalBtn>
          <Link href={item.link} className="underline text-sm text-gray-500">
            나도 풀어볼래!
          </Link>
        </div>
      </div>
      {item.newLearn && (
        <OpenModalBtn
          className="border border-red-200 bg-white hover:bg-red-100 rounded flex justify-start items-center p-2 h-full max-h-16"
          modalProps={{
            elementId: 'new-root',
            item: 'algorithm',
            item_id: item.algorithm_id,
            updateItem: 'newLearn',
            type: 'alert',
            title: '이 문제를 풀면서 배웠어요!',
            content: item.newLearn
          }}
        >
          <div className="break-all whitespace-normal line-clamp-2">
            {onUpdate.item_id === item.algorithm_id && onUpdate.update ? (
              <p className="text-sm text-gray-500">배운점을 수정해주세요!</p>
            ) : htmlTagRegex.test(item.newLearn) ? (
              <Viewer initialValue={item.newLearn} />
            ) : (
              <p className="text-sm">{item.newLearn}</p>
            )}
          </div>
        </OpenModalBtn>
      )}
      <p className="text-xs text-gray-500 text-end">{getformattedDate(item.created_at)}</p>
    </div>
  );
};

export default SingleAlgorithm;
