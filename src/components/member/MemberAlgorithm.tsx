'use client';

import { useState } from 'react';
import { useFetchThatUsersAlgorithm } from '@/query/useQueries/useMemberQuery';
import MakeNewAlgorithm from './algorithm/MakeNewAlgorithm';
import { getformattedDate } from '@/utils/utilFns';

const MemberAlgorithm = ({
  thatUserID,
  currentUserID
}: {
  thatUserID: string | undefined;
  currentUserID: string | undefined;
}) => {
  const [writeNewPost, setWriteNewPost] = useState(false);
  const { algorithmData, algorithmIsLoading } = useFetchThatUsersAlgorithm(thatUserID);

  console.log('algorithmData =>', algorithmData);

  const handleNewPost = () => {
    setWriteNewPost((prev) => !prev);
  };

  if (algorithmIsLoading) return null;

  return (
    <div className="w-full flex flex-col border min-h-[500px] h-full">
      <div className="w-full flex justify-end p-2">
        {thatUserID === currentUserID && (
          <button className="border" onClick={handleNewPost}>
            new 알고리즘
          </button>
        )}
      </div>
      <div className="h-full overflow-y-auto p-2">
        {thatUserID === currentUserID ? (
          writeNewPost ? (
            <MakeNewAlgorithm thatUserID={thatUserID} />
          ) : (
            <div className="p-2 border grid grid-cols-2 max-sm:grid-cols-1 gap-4">
              {algorithmData?.map((item) => (
                <div key={item.algorithm_id} className="flex flex-col gap-2 p-4 h-60 justify-between border rounded">
                  <div className="flex flex-col gap-1">
                    <h2 className="font-bold text-2xl">{item.title}</h2>
                    <div className="flex gap-1 items-center">
                      <p className="font-semibold text-xl">Lv.</p>
                      <p className="text-blue-500">{item.level}</p>
                    </div>
                  </div>
                  <div className="border rounded h-full max-h-24">
                    <p className="text-xs text-gray-500">이런 걸 배웠어요!</p>
                    <p className="overflow-hidden break-all whitespace-normal line-clamp-2">{item.newLearn}</p>
                  </div>
                  <p>
                    {getformattedDate(new Date(new Date(item.created_at).getTime() + 9 * 60 * 60 * 1000).toString())}
                  </p>
                </div>
              ))}
            </div>
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default MemberAlgorithm;
