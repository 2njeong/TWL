'use client';

import { useFetchGuestBook } from '@/query/useQueries/useMemberQuery';
import AvatarImage from '../information/AvatarImage';
import { getformattedDate } from '@/utils/utilFns';
import { GUESTBOOK_OF_THATUSER } from '@/query/member/memberQueryKey';
import DeleteBtn from '@/components/utilComponents/DeleteBtn';
import { useAtom } from 'jotai';
import { pageAtom } from '@/atom/memberAtom';
import PageNation from './PageNation';
import { useEffect } from 'react';
import { useGetCurrentUser, useGetThatUser } from '@/customHooks/common';

const GuestBookList = ({ id }: { id: string }) => {
  const [page, setPage] = useAtom(pageAtom);
  const { user_id: creator } = useGetCurrentUser() ?? {};
  const { user_id: thatUserId } = useGetThatUser(id);
  const { guestbookData, guestbookLoading } = useFetchGuestBook(thatUserId, page);

  useEffect(() => {
    if (page > 1 && guestbookData && guestbookData?.length < 1) {
      setPage((prev) => prev - 1);
    }
  }, [guestbookData, page, setPage]);

  const deleteBtnProps = {
    item: 'guestbook',
    queryKey: GUESTBOOK_OF_THATUSER,
    additionalKey: [thatUserId, page],
    containerClassName: 'w-full flex justify-end',
    btnContainerClassName: 'w-6 h-6',
    btnClassName: 'text-xl cursor-pointer',
    hoverContainerClassName: 'w-12 h-8 -bottom-10 py-1',
    hoverBtnClassName: 'text-sm'
  };

  if (guestbookLoading) return <div className="w-full h-full flex justify-center items-center">방명록 로딩중..</div>;
  return (
    <>
      {guestbookData && guestbookData.length > 0 ? (
        guestbookData.map(
          (book) =>
            !book.isDeleted && (
              <div
                key={book.guestbook_id}
                className="border-2 w-full max-w-[35rem] flex flex-col items-center gap-2 pt-4 pb-2 px-2 rounded-md"
              >
                {creator === book.creator && <DeleteBtn item_id={book.guestbook_id} {...deleteBtnProps} />}
                <div className="w-full flex items-center gap-6 justify-center">
                  <AvatarImage src={book.avatar || '/dog_avatar.jpg'} alt="방명록 아바타" size="7" />
                  <div
                    className={`border rounded w-4/6 h-full resize-none p-2 focus:outline-none ${
                      !book.allowShow && 'text-gray-500'
                    }`}
                  >
                    {book.allowShow ? book.content : '비공개 글 입니다.'}
                  </div>
                </div>
                <div className="w-full flex items-center justify-end">
                  <p className="text-gray-500 text-sm">{getformattedDate(book.created_at)}</p>
                </div>
              </div>
            )
        )
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-gray-500">불러올 데이터가 없습니다.</p>
        </div>
      )}
      <PageNation />
    </>
  );
};

export default GuestBookList;
