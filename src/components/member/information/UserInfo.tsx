'use client';

import { Tables } from '@/type/database';
import { useState } from 'react';
import { GoGear } from 'react-icons/go';
import ShowUserData from './ShowUserData';
import UpdateUserForm from './UpdateUserForm';
import Avatar from './Avatar';
import { useAtom } from 'jotai';
import { avatarAtom } from '@/atom/memberAtom';

const UserInfo = ({
  thatUserData,
  currentUser
}: {
  thatUserData: Tables<'users'> | undefined;
  currentUser: Tables<'users'> | undefined;
}) => {
  const [userFormOpen, setUserFormOpen] = useState(false);
  const [_, setAvatar] = useAtom(avatarAtom);
  const userDataList = ['nickname', 'Github', 'Email'];

  const handleUserFormOpen = () => {
    setAvatar(null);
    setUserFormOpen((prev) => !prev);
  };

  return (
    <>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-lg font-bold">{thatUserData?.nickname}</h2>
          <h2 className="text-lg"> 님의 스터디존</h2>
        </div>

        {currentUser?.user_id === thatUserData?.user_id && (
          <button onClick={handleUserFormOpen} className="">
            {userFormOpen ? '수정취소' : <GoGear className="text-xl" />}
          </button>
        )}
      </div>

      <Avatar
        userFormOpen={userFormOpen}
        userData={thatUserData?.user_id === currentUser?.user_id ? currentUser : thatUserData}
      />
      <div className={`h-[40%] border border-4 rounded-md w-[95%] flex py-2 px-4`}>
        {userFormOpen ? (
          <>
            <UpdateUserForm currentUser={currentUser} userDataList={userDataList} setUserFormOpen={setUserFormOpen} />
          </>
        ) : (
          <ShowUserData
            userDataList={userDataList}
            userData={thatUserData?.user_id === currentUser?.user_id ? currentUser : thatUserData}
          />
        )}
      </div>
    </>
  );
};

export default UserInfo;
