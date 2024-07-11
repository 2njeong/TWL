import React, { useRef } from 'react';
import AvatarImage from '../information/AvatarImage';
import { useQueryClient } from '@tanstack/react-query';
import { Tables } from '@/type/database';
import { CURRENT_USER_QUERY_KEY, THAT_USER_QUERY_KEY } from '@/query/auth/authQueryKeys';
import SubmitBtn from '@/components/makequiz/SubmitBtn';
import { submitGuestBook } from '@/app/member/action';
import { VscSend } from 'react-icons/vsc';
import { TbCubeSend } from 'react-icons/tb';

const GuestBookForm = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const { user_id: creator, avatar } = queryClient.getQueryData<Tables<'users'>>([CURRENT_USER_QUERY_KEY]) ?? {};
  const [thatUserData] = queryClient.getQueryData<Tables<'users'>[]>([THAT_USER_QUERY_KEY, id]) ?? [];
  const guestBookRef = useRef<HTMLFormElement | null>(null);

  const guestBookBtnProps = {
    formId: 'guestbook',
    pendingText: <TbCubeSend />,
    doneText: <VscSend />,
    sectionClasName: 'flex justify-end',
    buttonClassName: 'w-8 text-xl flex justify-center'
  };

  const submitGeustBookForm = async (data: FormData) => {
    const allowShow = data.get('allowShow');
    const guestBookObj = { creator, avatar, allowShow: !allowShow };
    const result = await submitGuestBook(guestBookObj, data);
    if (result) {
      alert(result.message);
      return;
    }
    guestBookRef.current?.reset();
  };

  return (
    <form
      id="guestbook"
      ref={guestBookRef}
      action={submitGeustBookForm}
      className="border w-[85%] h-48 flex flex-col items-center justify-center gap-2 pt-10 pb-4 px-2"
    >
      <div className="w-full flex items-center gap-6 justify-center">
        <div>
          <AvatarImage src={avatar || '/dog_avatar.jpg'} alt="방명록 아바타" size="28" />
        </div>
        <textarea
          name="content"
          placeholder={`${thatUserData?.nickname}님께 글을 남겨주세요!`}
          className="border rounded w-4/6 h-full resize-none p-2 focus:outline-none"
        ></textarea>
      </div>
      <div className="w-full flex items-center justify-end gap-1">
        <div className="flex gap-2">
          <input type="checkbox" name="allowShow"></input>
          <p className="text-gray-500">비공개</p>
        </div>
        <SubmitBtn btnProps={guestBookBtnProps} />
      </div>
    </form>
  );
};

export default GuestBookForm;
