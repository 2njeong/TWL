'use client';

import { Tables } from '@/type/database';
import { useState } from 'react';
import { GoGear } from 'react-icons/go';
import ShowUserData from './ShowUserData';
import UpdateUserForm from './UpdateUserForm';

const UserInfo = ({
  thatUserData,
  currentUser
}: {
  thatUserData: Tables<'users'> | undefined;
  currentUser: Tables<'users'> | undefined;
}) => {
  const [userFormOpen, setUserFormOpen] = useState(false);
  const userDataList = ['nickname', 'Github', 'Email'];

  const handleUserFormOpen = () => {
    setUserFormOpen((prev) => !prev);
  };

  return (
    <section className="border w-2/6 flex flex-col justify-around items-center p-2">
      <div className="h-3/6 border flex items-center">
        <div className="w-40 h-40 rounded-full bg-gray-200">avatar</div>
      </div>
      <div className="h-3/6 w-full border flex flex-col justify-center gap-4 py-2 px-4">
        {currentUser?.user_id === thatUserData?.user_id && (
          <button onClick={handleUserFormOpen} className="ml-auto">
            <GoGear className="text-xl" />
          </button>
        )}
        {userFormOpen ? (
          <UpdateUserForm
            currentUser={currentUser}
            thatUserData={thatUserData}
            userDataList={userDataList}
            setUserFormOpen={setUserFormOpen}
          />
        ) : (
          <ShowUserData userDataList={userDataList} thatUserData={thatUserData} />
        )}
      </div>
    </section>
  );
};

export default UserInfo;
