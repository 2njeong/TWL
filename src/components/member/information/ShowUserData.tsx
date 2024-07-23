import { Tables } from '@/type/database';
import Link from 'next/link';
import React from 'react';

const ShowUserData = ({
  userDataList,
  userData
}: {
  userDataList: string[];
  userData: Tables<'users'> | undefined;
}) => {
  return (
    <div className="w-full flex flex-col gap-2 justify-center">
      {userDataList.map((data, i) => (
        <div key={data} className="flex gap-2 items-center">
          <p>{data}: </p>
          {i % 2 > 0}
          <p className="text-gray-500">
            {userData?.allowshow ? (
              (userData as any)[data.toLowerCase()] ? (
                i % 2 > 0 ? (
                  <Link
                    href={(userData as any)[data.toLowerCase()]}
                    className="underline underline-offset-4 hover:text-gray-400"
                  >
                    {(userData as any)[data.toLowerCase()]}
                  </Link>
                ) : (
                  <p>{(userData as any)[data.toLowerCase()]}</p>
                )
              ) : (
                '미작성'
              )
            ) : (
              '비공개'
            )}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ShowUserData;
