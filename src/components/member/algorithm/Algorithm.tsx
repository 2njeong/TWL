'use client';

import { useState } from 'react';
import { useFetchThatUsersAlgorithm } from '@/query/useQueries/useMemberQuery';
import MakeNewAlgorithm from './MakeNewAlgorithm';
import AlgorithmList from './AlgorithmList';
import { MdOutlineCancel } from 'react-icons/md';
import { useQueryClient } from '@tanstack/react-query';
import { Tables } from '@/type/database';
import { CURRENT_USER_QUERY_KEY, THAT_USER_QUERY_KEY } from '@/query/auth/authQueryKeys';

const Algorithm = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const { user_id: currentUserID } = queryClient.getQueryData<Tables<'users'>>([CURRENT_USER_QUERY_KEY]) ?? {};
  const [{ user_id: thatUserID }] = queryClient.getQueryData<Tables<'users'>[]>([THAT_USER_QUERY_KEY, id]) ?? [];
  const [writeNewPost, setWriteNewPost] = useState(false);
  const { algorithmData, algorithmIsLoading } = useFetchThatUsersAlgorithm(thatUserID);

  const handleNewPost = () => {
    setWriteNewPost((prev) => !prev);
  };

  if (algorithmIsLoading) return <div>알고리즘 로딩중..</div>;

  return (
    <div className="w-full h-full max-h-[90%] flex flex-col border">
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
