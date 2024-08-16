import React, { useRef } from 'react';
import AvatarImage from '../information/AvatarImage';
import { useQueryClient } from '@tanstack/react-query';
import SubmitBtn from '@/components/makequiz/SubmitBtn';
import { submitGuestBook } from '@/app/member/action';
import { VscSend } from 'react-icons/vsc';
import { TbCubeSend } from 'react-icons/tb';
import { useAtom } from 'jotai';
import { pageAtom } from '@/atom/memberAtom';
import { GUESTBOOK_OF_THATUSER } from '@/query/member/memberQueryKey';
import { useGetCurrentUser, useGetThatUser } from '@/customHooks/common';

const GuestBookForm = ({ id }: { id: string }) => {
  const [page, _] = useAtom(pageAtom);
  const queryClient = useQueryClient();
  const { user_id: creator, avatar } = useGetCurrentUser() ?? {};
  const { user_id: thatUserId, nickname } = useGetThatUser(id);
  const guestBookRef = useRef<HTMLFormElement | null>(null);

  // 데이터를 삭제한 뒤 추가해야 setTotalpage가 의도대로 동작할 수 있음
  const findEmptyQueryNRemove = async (userId: string) => {
    // 모든 쿼리 캐시 항목을 가져옴
    const allQueries = queryClient.getQueryCache().findAll();
    // 길이가 0이고 특정 패턴을 가진 쿼리 데이터 찾기
    allQueries.forEach((query) => {
      const queryKey = query.queryKey;
      const data = query.state.data;
      // 쿼리 키가 특정 패턴과 일치하는지 확인
      const matchesPattern =
        Array.isArray(queryKey) &&
        queryKey[0] === GUESTBOOK_OF_THATUSER &&
        queryKey[1] === userId &&
        typeof queryKey[2] === 'number' &&
        queryKey[2] !== 1;
      // 데이터가 배열이고 길이가 0인지 확인
      const isEmptyData = Array.isArray(data) && data.length === 0;
      // 길이가 0이면 해당 쿼리데이터 제거
      if (matchesPattern && isEmptyData) {
        console.log('찾음?');
        queryClient.removeQueries({ queryKey: query.queryKey });
      }
    });
  };

  const submitGeustBookForm = async (data: FormData) => {
    const allowShow = data.get('allowShow');
    const guestBookObj = { creator, allowShow: !allowShow, dear: thatUserId };
    const result = await submitGuestBook(guestBookObj, data);
    if (result) {
      alert(result.message);
      return;
    }
    guestBookRef.current?.reset();
    await findEmptyQueryNRemove(thatUserId);
    queryClient.invalidateQueries({ queryKey: [GUESTBOOK_OF_THATUSER, thatUserId, page] });
  };

  const guestBookBtnProps = {
    formId: 'guestbook',
    pendingText: <TbCubeSend />,
    doneText: <VscSend />,
    sectionClassName: 'flex justify-end',
    buttonClassName: 'w-8 text-xl flex justify-center'
  };

  return (
    <>
      {creator !== thatUserId && (
        <form
          id="guestbook"
          ref={guestBookRef}
          action={submitGeustBookForm}
          className="border w-full max-w-[35rem] h-48 flex flex-col items-center justify-center gap-2 pt-10 pb-4 px-2 shadow-md"
        >
          <div className="w-full flex items-center gap-6 justify-center">
            <div>
              <AvatarImage src={avatar || '/basic_avatar.png'} alt="방명록 아바타" size="7" />
            </div>
            <textarea
              name="content"
              placeholder={`${nickname}님께 글을 남겨주세요!`}
              className="border rounded w-4/6 h-full resize-none p-2 focus:outline-none"
            ></textarea>
          </div>
          <div className="w-full flex items-center justify-between gap-1">
            <div className="w-full flex gap-2">
              <input type="checkbox" name="allowShow"></input>
              <p className="text-gray-500">비공개</p>
            </div>
            <SubmitBtn btnProps={guestBookBtnProps} />
          </div>
        </form>
      )}
    </>
  );
};

export default GuestBookForm;
