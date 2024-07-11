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
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDeleteOpen = () => {
    setDeleteOpen((prev) => !prev);
  };

  const handleDeleteGuestBook = async (id: string) => {
    await submitDeleteGuestBook(id);
  };

  const deleteBtnProps = {
    queryKey: [THAT_USERS_GUESTBOOK, thatUserId],
    containerClassName: 'w-full flex justify-end',
    btnContainerClassName: 'w-7 h-7',
    btnClassName: 'text-xl cursor-pointer',
    hoverContainerClassName: 'w-12 h-6 -bottom-6',
    hoverBtnClassName: 'text-sm'
  };

  console.log('guestbookData =>', guestbookData);

  if (guestbookLoading) return <>방명록 로딩중..</>;
  return (
    <>
      {guestbookData?.map((book) => (
        <div key={book.id} className="border w-full max-w-[35rem] flex flex-col items-center gap-2 pt-4 pb-2 px-2">
          {/* <div className="relative w-full flex justify-end">
            <button className="flex justify-center items-center hover:rounded-full hover:border w-7 h-7 ">
              <HiOutlineEllipsisVertical onClick={handleDeleteOpen} className="text-xl cursor-pointer" />
            </button>
            {deleteOpen && (
              <div className="border rounded-md absolute flex justify-center bg-white w-10 h-6 -bottom-6">
                <button
                  className="hover:bg-gray-200 hover:w-full rounded text-sm"
                  onClick={async () => await handleDeleteGuestBook(book.id)}
                >
                  삭제
                </button>
              </div>
            )}
          </div> */}
          <DeleteBtn item_id={thatUserId} {...deleteBtnProps} />

          <div className="w-full flex items-center gap-6 justify-center">
            <div>
              <AvatarImage src={book.avatar || '/dog_avatar.jpg'} alt="방명록 아바타" size="28" />
            </div>
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
      ))}
    </>
  );
};

export default GuestBookList;
