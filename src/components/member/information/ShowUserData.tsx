import { Tables } from '@/type/database';
import React from 'react';

const ShowUserData = ({
  userDataList,
  userData
}: {
  userDataList: string[];
  userData: Tables<'users'> | undefined;
}) => {
  return (
    <div className="flex flex-col gap-2 px-4 justify-center">
      {userDataList.map((data) => (
        <div key={data} className="flex gap-2 items-center">
          <p>{data}: </p>
          <p className="text-gray-500">
            {userData?.allowshow ? (userData as any)[data.toLowerCase()] ?? '비공개' : '비공개'}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ShowUserData;
