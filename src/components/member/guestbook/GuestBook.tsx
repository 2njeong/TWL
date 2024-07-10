'use client';

import { Tables } from '@/type/database';
import AvatarImage from '../information/AvatarImage';
import SubmitBtn from '@/components/makequiz/SubmitBtn';

const GuestBook = ({ userData }: { userData: Tables<'users'> | undefined }) => {
  const guestBookBtnProps = {
    formId: 'guestbook',
    pendingText: '...',
    sectionClasName: 'w-full flex justify-end',
    buttonClassName: 'w-12 border',
    doneText: '확인'
  };
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <form
        id="guestbook"
        className="border w-[85%] h-48 flex flex-col items-center justify-center gap-2 pt-10 pb-4 px-2"
      >
        <div className="w-full flex items-center gap-6 justify-center">
          <div>
            <AvatarImage src={userData?.avatar || '/dog_avatar.jpg'} alt="방명록 아바타" size="28" />
          </div>
          <textarea className="border w-4/6 h-full resize-none p-2">111</textarea>
        </div>
        <SubmitBtn btnProps={guestBookBtnProps} />
      </form>
      <div></div>
    </div>
  );
};

export default GuestBook;
