import React, { useRef } from 'react';
import AvatarImage from '../information/AvatarImage';
import { useQueryClient } from '@tanstack/react-query';
import { Tables } from '@/type/database';
import { CURRENT_USER_QUERY_KEY, THAT_USER_QUERY_KEY } from '@/query/auth/authQueryKeys';
import SubmitBtn from '@/components/makequiz/SubmitBtn';
import { submitGuestBook } from '@/app/member/action';
import { VscSend } from 'react-icons/vsc';
import { TbCubeSend } from 'react-icons/tb';
import { useAtom } from 'jotai';
import { pageAtom } from '@/atom/memberAtom';
import { GUESTBOOK_OF_THATUSER } from '@/query/member/memberQueryKey';

const GuestBookForm = ({ id }: { id: string }) => {
  const [page, _] = useAtom(pageAtom);
  const queryClient = useQueryClient();
  const { user_id: creator, avatar } = queryClient.getQueryData<Tables<'users'>>([CURRENT_USER_QUERY_KEY]) ?? {};
  const [{ user_id: thstUserId, nickname }] =
    queryClient.getQueryData<Tables<'users'>[]>([THAT_USER_QUERY_KEY, id]) ?? [];
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
        typeof queryKey[2] === 'number';
      // 데이터가 배열이고 길이가 0인지 확인
      const isEmptyData = Array.isArray(data) && data.length === 0;
      // 길이가 0이면 해당 쿼리데이터 제거
      if (matchesPattern && isEmptyData) {
        queryClient.removeQueries({ queryKey: query.queryKey });
      }
    });
  };

  const submitGeustBookForm = async (data: FormData) => {
    const allowShow = data.get('allowShow');
    const guestBookObj = { creator, allowShow: !allowShow };
    const result = await submitGuestBook(guestBookObj, data);
    if (result) {
      alert(result.message);
      return;
    }
    guestBookRef.current?.reset();
    await findEmptyQueryNRemove(thstUserId);
    queryClient.invalidateQueries({ queryKey: [GUESTBOOK_OF_THATUSER, thstUserId, page] });
  };

  const guestBookBtnProps = {
    formId: 'guestbook',
    pendingText: <TbCubeSend />,
    doneText: <VscSend />,
    sectionClasName: 'flex justify-end',
    buttonClassName: 'w-8 text-xl flex justify-center'
  };

  return (
    <>
      {creator !== thstUserId && (
        <form
          id="guestbook"
          ref={guestBookRef}
          action={submitGeustBookForm}
          className="border w-full max-w-[35rem] h-48 flex flex-col items-center justify-center gap-2 pt-10 pb-4 px-2"
        >
          <div className="w-full flex items-center gap-6 justify-center">
            <div>
              <AvatarImage src={avatar || '/dog_avatar.jpg'} alt="방명록 아바타" size="7" />
            </div>
            <textarea
              name="content"
              placeholder={`${nickname}님께 글을 남겨주세요!`}
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
      )}
    </>
  );
};

export default GuestBookForm;
