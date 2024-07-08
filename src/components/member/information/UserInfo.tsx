'use client';

import { Tables } from '@/type/database';

const UserInfo = ({
  thatUserData,
  currentUserID
}: {
  thatUserData: Tables<'users'> | undefined;
  currentUserID: string | undefined;
}) => {
  const userDataList = ['nickname', 'Github', 'Email'];

  return (
    <section className="border w-2/6 flex flex-col gap-3 justify-around items-center p-2">
      <div className="h-3/6 border flex items-center">
        <div className="w-40 h-40 rounded-full bg-gray-200">avatar</div>
      </div>
      <div className="h-3/6 flex flex-col gap-2 border justify-center">
        {userDataList.map((data) => (
          <div key={data} className="flex gap-2">
            <p>{data}: </p>
            <p className="text-gray-500">
              {thatUserData?.allowShow ? (thatUserData as any)[data.toLowerCase()] ?? '비공개' : '비공개'}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserInfo;
