'use client';

import { avatarAtom } from '@/atom/memberAtom';
import { useAtom } from 'jotai';
import { ChangeEvent, useRef } from 'react';
import { Tables } from '@/type/database';
import AvatarImage from './AvatarImage';

const Avatar = ({ userFormOpen, currentUser }: { userFormOpen: boolean; currentUser: Tables<'users'> | undefined }) => {
  const imgRef = useRef(null);
  const [avatar, setAvatar] = useAtom(avatarAtom);
  const basicAvatar = currentUser?.avatar || '/dog_avatar.jpg';

  console.log('basicAvatar =>', basicAvatar);
  const collectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setAvatar(file);
  };

  return (
    <div className="w-full h-3/6 border flex justify-center items-center">
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
            <AvatarImage src={URL.createObjectURL(avatar)} alt="미리보기" size="13" />
          ) : (
            <AvatarImage src={basicAvatar} alt="업데이트 전 원래 아바타" size="13" />
          )}
        </label>
      ) : (
        <div>
          {currentUser?.avatar ? (
            <AvatarImage src={currentUser?.avatar as string} alt="업데이트 후 아바타" size="13" />
          ) : (
            <AvatarImage src={basicAvatar} alt="업데이트 전 원래 아바타" size="13" />
          )}
        </div>
      )}
    </div>
  );
};

export default Avatar;
