'use client';

import { CURRENT_USER_QUERY_KEY, THAT_USER_QUERY_KEY } from '@/query/auth/authQueryKeys';
import { useFetchGuestBook } from '@/query/useQueries/useMemberQuery';
import { Tables } from '@/type/database';
import { useQueryClient } from '@tanstack/react-query';
import AvatarImage from '../information/AvatarImage';
import { getformattedDate } from '@/utils/utilFns';
import { THAT_USERS_GUESTBOOK } from '@/query/member/memberQueryKey';
import DeleteBtn from '@/components/utilComponents/DeleteBtn';
import { useAtom } from 'jotai';
import { pageAtom } from '@/atom/memberAtom';

const GuestBookList = ({ id }: { id: string }) => {
  const [page, setPage] = useAtom(pageAtom);
  const queryClient = useQueryClient();
  const { user_id: creator } = queryClient.getQueryData<Tables<'users'>>([CURRENT_USER_QUERY_KEY]) ?? {};
  const [{ user_id: thatUserId }] = queryClient.getQueryData<Tables<'users'>[]>([THAT_USER_QUERY_KEY, id]) ?? [];
  const { guestbookData, guestbookLoading, totalPage } = useFetchGuestBook(thatUserId, page);

  const handlePlusPage = (pageNum: number) => {
    setPage(pageNum);
  };

  const deleteBtnProps = {
    item: 'guestbook',
    queryKey: THAT_USERS_GUESTBOOK,
    additionalKey: [thatUserId, page],
    containerClassName: 'w-full flex justify-end',
    btnContainerClassName: 'w-6 h-6',
    btnClassName: 'text-xl cursor-pointer',
    hoverContainerClassName: 'w-12 h-6 -bottom-8',
    hoverBtnClassName: 'text-sm'
  };

  if (guestbookLoading) return <>방명록 로딩중..</>;
  return (
    <>
      {guestbookData && guestbookData.length > 0 ? (
        guestbookData.map(
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
        )
      ) : (
        <div>더 이상 불러올 데이터가 없습니다.</div>
      )}

      <div className="w-full flex items-center justify-center gap-4">
        {Array.from({ length: totalPage })
          .map((_, idx) => idx + 1)
          .map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePlusPage(pageNum)}
              className={`${pageNum === page && 'text-lg font-bold'} ${pageNum === totalPage && 'text-gray-500'}`}
            >
              {pageNum}
            </button>
          ))}
      </div>
    </>
  );
};

export default GuestBookList;
