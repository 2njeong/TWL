'use client';

import { avatarAtom } from '@/atom/memberAtom';
import { useAtom } from 'jotai';
import { ChangeEvent, useRef } from 'react';
import { Tables } from '@/type/database';
import AvatarImage from './AvatarImage';

const Avatar = ({ userFormOpen, currentUser }: { userFormOpen: boolean; currentUser: Tables<'users'> | undefined }) => {
  const imgRef = useRef(null);
  const [avatar, setAvatar] = useAtom(avatarAtom);

  const collectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setAvatar(file);
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
          {avatar ? (
            <AvatarImage url={URL.createObjectURL(avatar)} alt="미리보기" />
          ) : (
            <AvatarImage url={currentUser?.avatar as string} alt="업데이트 전 원래 아바타" />
          )}
        </label>
      ) : (
        <div>
          {currentUser?.avatar ? (
            <AvatarImage url={currentUser?.avatar as string} alt="업데이트 후 아바타" />
          ) : (
            <div className="w-40 h-40 rounded-full bg-gray-200">avatar</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Avatar;
