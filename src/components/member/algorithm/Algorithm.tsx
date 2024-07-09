'use client';

import { useState } from 'react';
import { useFetchThatUsersAlgorithm } from '@/query/useQueries/useMemberQuery';
import MakeNewAlgorithm from './MakeNewAlgorithm';
import AlgorithmList from './AlgorithmList';
import { MdOutlineCancel } from 'react-icons/md';

const Algorithm = ({
  thatUserID,
  currentUserID
}: {
  thatUserID: string | undefined;
  currentUserID: string | undefined;
}) => {
  const [writeNewPost, setWriteNewPost] = useState(false);
  const { algorithmData, algorithmIsLoading } = useFetchThatUsersAlgorithm(thatUserID);

  const handleNewPost = () => {
    setWriteNewPost((prev) => !prev);
  };

  if (algorithmIsLoading) return <div>알고리즘 로딩중..</div>;

  return (
    <div className="w-full flex flex-col border min-h-[500px] h-full">
      <div className="w-full flex justify-end p-2">
        {thatUserID === currentUserID && (
          <button className={`${!writeNewPost && 'border'}`} onClick={handleNewPost}>
            {writeNewPost ? <MdOutlineCancel className="text-2xl" /> : 'new 알고리즘'}
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

export default Algorithm;
