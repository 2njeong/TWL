'use client';

import { CURRENT_USER_QUERY_KEY, THAT_USER_QUERY_KEY } from '@/query/auth/authQueryKeys';
import { useFetchGuestBook } from '@/query/useQueries/useMemberQuery';
import { Tables } from '@/type/database';
import { useQueryClient } from '@tanstack/react-query';
import AvatarImage from '../information/AvatarImage';
import { getformattedDate } from '@/utils/utilFns';
import { HiOutlineEllipsisVertical } from 'react-icons/hi2';
import { useState } from 'react';
import { submitDeleteGuestBook } from '@/app/member/action';
import { THAT_USERS_GUESTBOOK } from '@/query/member/memberQueryKey';
import DeleteBtn from '@/components/utilComponents/DeleteBtn';

const GuestBookList = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const { user_id: creator } = queryClient.getQueryData<Tables<'users'>>([CURRENT_USER_QUERY_KEY]) ?? {};
  const [{ user_id: thatUserId }] = queryClient.getQueryData<Tables<'users'>[]>([THAT_USER_QUERY_KEY, id]) ?? [];
  const { guestbookData, guestbookLoading } = useFetchGuestBook(thatUserId);

  const deleteBtnProps = {
    item: 'guestbook',
    queryKey: [THAT_USERS_GUESTBOOK, thatUserId],
    containerClassName: 'w-full flex justify-end',
    btnContainerClassName: 'w-6 h-6',
    btnClassName: 'text-xl cursor-pointer',
    hoverContainerClassName: 'w-12 h-6 -bottom-8',
    hoverBtnClassName: 'text-sm'
  };

  console.log('guestbookData =>', guestbookData);

  if (guestbookLoading) return <>방명록 로딩중..</>;
  return (
    <>
      {guestbookData?.map(
        (book) =>
          !book.isDeleted && (
            <div
              key={book.guestbook_id}
              className="border w-full max-w-[35rem] flex flex-col items-center gap-2 pt-4 pb-2 px-2"
            >
              {creator === book.creator && <DeleteBtn item_id={book.guestbook_id} {...deleteBtnProps} />}
              <div className="w-full flex items-center gap-6 justify-center">
                <AvatarImage src={book.avatar || '/dog_avatar.jpg'} alt="방명록 아바타" size="28" />
                <div className="border rounded w-4/6 h-full resize-none p-2 focus:outline-none">
                  {book.allowShow ? book.content : '비공개 글 입니다.'}
                </div>
              </div>
              <div className="w-full flex items-center justify-end">
                <p className="text-gray-500 text-sm">
                  {getformattedDate(new Date(new Date(book.created_at).getTime() + 9 * 60 * 60 * 1000).toString())}
                </p>
              </div>
            </div>
          )
      )}
    </>
  );
};

export default GuestBookList;
