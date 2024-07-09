'use client';

import { Tables } from '@/type/database';
import { useState } from 'react';
import { GoGear } from 'react-icons/go';
import ShowUserData from './ShowUserData';
import UpdateUserForm from './UpdateUserForm';
import Avatar from './Avatar';
import SubmitBtn from '@/components/makequiz/SubmitBtn';

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

  // console.log(111, new Set(userDataList));
  // console.log(222, Array.from(new Set(userDataList)));

  return (
    <section className="border w-2/6 flex flex-col justify-around items-center p-2">
      {currentUser?.user_id === thatUserData?.user_id && (
        <button onClick={handleUserFormOpen} className="ml-auto">
          {userFormOpen ? '수정취소' : <GoGear className="text-xl" />}
        </button>
      )}
      <Avatar userFormOpen={userFormOpen} currentUser={currentUser} />
      {/* <div className={`h-3/6 w-full border flex flex-col ${userFormOpen ? 'justify-end' : 'justify-center'} py-2 px-4`}> */}
      <div className={`h-3/6 w-full border flex flex-col justify-center py-2 px-4`}>
        {userFormOpen ? (
          <>
            <UpdateUserForm
              currentUser={currentUser}
              thatUserData={thatUserData}
              userDataList={userDataList}
              setUserFormOpen={setUserFormOpen}
            />
          </>
        ) : (
          <ShowUserData userDataList={userDataList} thatUserData={thatUserData} />
        )}
      </div>
    </section>
  );
};

export default UserInfo;
