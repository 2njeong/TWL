'use client';

import OpenModalBtn from '@/components/utilComponents/modal/OpenModalBtn';
import { Tables } from '@/type/database';
import { getformattedDate } from '@/utils/utilFns';
import Link from 'next/link';

const AlgorithmList = ({ algorithmData }: { algorithmData: Tables<'algorithm'>[] | undefined }) => {
  return (
    <div className="p-2 border grid grid-cols-2 max-sm:grid-cols-1 gap-x-6 gap-y-8">
      {algorithmData?.map((item) => (
        <div key={item.algorithm_id} className="flex flex-col gap-2 py-2 px-4 h-48 justify-between border rounded">
          <div className="flex flex-col gap-2">
            <div>
              <h2 className="font-bold text-xl truncate">{item.title}</h2>
              <div className="flex gap-1 items-center">
                <p className="font-semibold">Lv.</p>
                <p className="text-blue-500">{item.level}</p>
              </div>
            </div>
            <Link href={item.link} className="underline text-sm text-gray-500">
              나도 풀어볼래!
            </Link>
          </div>
          <OpenModalBtn
            className={`${item.newLearn && 'border'} rounded h-full max-h-24 flex justify-start items-center`}
            modalProps={{
              elementId: 'new-root',
              type: 'alert',
              title: '이 문제를 풀면서 배웠어요!',
              content: item.newLearn && item.newLearn
            }}
          >
            <p className="overflow-hidden break-all whitespace-normal line-clamp-2 text-sm">
              {item.newLearn && item.newLearn}
            </p>
          </OpenModalBtn>
          <p className="text-xs text-gray-500 text-end">
            {getformattedDate(new Date(new Date(item.created_at).getTime() + 9 * 60 * 60 * 1000).toString())}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AlgorithmList;
