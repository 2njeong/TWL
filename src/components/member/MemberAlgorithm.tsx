'use client';

import { useState } from 'react';
import { useFetchThatUsersAlgorithm } from '@/query/useQueries/useMemberQuery';
import MakeNewAlgorithm from './algorithm/MakeNewAlgorithm';
import AlgorithmList from './algorithm/AlgorithmList';

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
            <AlgorithmList algorithmData={algorithmData} />
          )
        ) : (
          <AlgorithmList algorithmData={algorithmData} />
        )}
      </div>
    </div>
  );
};

export default MemberAlgorithm;
