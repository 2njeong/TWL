'use client';

import { useFetchGuestBook } from '@/query/useQueries/useMemberQuery';
import { useAtom } from 'jotai';
import { pageAtom } from '@/atom/memberAtom';
import PageNation from './PageNation';
import { useEffect } from 'react';
import { useGetThatUser } from '@/customHooks/common';
import SingleGuestBook from './SingleGuestBook';

const GuestBookList = ({ id }: { id: string }) => {
  const [page, setPage] = useAtom(pageAtom);
  const { user_id: thatUserId } = useGetThatUser(id);
  const { guestbookData, guestbookLoading } = useFetchGuestBook(thatUserId, page);

  useEffect(() => {
    if (page > 1 && guestbookData && guestbookData?.length < 1) {
      setPage((prev) => prev - 1);
    }
  }, [guestbookData, page, setPage]);

  if (guestbookLoading) return <div className="w-full h-full flex justify-center items-center">방명록 로딩중..</div>;
  return (
    <>
      {guestbookData && guestbookData.length > 0 ? (
        guestbookData.map(
          (book) =>
            !book.isDeleted && (
              <div key={book.guestbook_id} className="w-full max-w-[35rem] ">
                <SingleGuestBook book={book} thatUserId={thatUserId} />
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
