'use client';

import { avatarAtom } from '@/atom/memberAtom';
import { useAtom } from 'jotai';
import { ChangeEvent, useRef } from 'react';
import Image from 'next/image';
import { Tables } from '@/type/database';
import { useFetchCurrentUser } from '@/query/useQueries/useAuthQuery';

const Avatar = ({ userFormOpen, currentUser }: { userFormOpen: boolean; currentUser: Tables<'users'> | undefined }) => {
  const imgRef = useRef(null);
  const [_, setAvatar] = useAtom(avatarAtom);

  const collectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setAvatar(file);
    // console.log(111, file, typeof file);
  };

  return (
    <div className="h-3/6 border flex items-center">
      {userFormOpen ? (
        <label className="flex items-center cursor-pointer">
          <input
            type="file"
            accept="image/*"
            name="avatar"
            form="updateUserForm"
            className="hidden"
            ref={imgRef}
            onChange={(e) => collectFile(e)}
          />
          <div className="w-40 h-40 rounded-full bg-gray-200">avatar</div>
        </label>
      ) : (
        <div>
          {currentUser?.avatar ? (
            <Image
              src={currentUser?.avatar as string}
              alt="유저 이미지"
              fill={true}
              style={{ objectFit: 'contain', borderRadius: '3px', pointerEvents: 'none' }}
              sizes="500px"
              priority={true}
            />
          ) : (
            <div className="w-40 h-40 rounded-full bg-gray-200">avatar</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Avatar;
