'use client';

import { pageAtom } from '@/atom/memberAtom';
import DeleteBtn from '@/components/utilComponents/DeleteBtn';
import { useGetCurrentUser, useHoverEvent } from '@/customHooks/common';
import { GUESTBOOK_OF_THATUSER } from '@/query/member/memberQueryKey';
import { ExtendedGuestBook } from '@/type/memberType';
import { useAtom } from 'jotai';
import AvatarImage from '../information/AvatarImage';
import { getformattedDate } from '@/utils/utilFns';
import HoverCreator from '@/components/utilComponents/HoverCreator';
import { useQueryClient } from '@tanstack/react-query';
import { GuestbookAlarm } from '@/type/alarmType';
import { ALARM_GUESTBOOK_QUERY_KEY } from '@/query/alarm/alarmQueryKey';
import { useEffect } from 'react';
import { useMarkGuestbookAsRead } from '@/query/useQueries/useAlarmQuery';

const SingleGuestBook = ({ book, thatUserId }: { book: ExtendedGuestBook; thatUserId: string }) => {
  const [page, _] = useAtom(pageAtom);
  const queryClient = useQueryClient();
  const { user_id: creator } = useGetCurrentUser() ?? {};
  const { isCreatorOpen, events } = useHoverEvent();
  const guestbookAlarms = queryClient.getQueryData<GuestbookAlarm[]>([ALARM_GUESTBOOK_QUERY_KEY]);
  const { mutate: markAsRead } = useMarkGuestbookAsRead();

  useEffect(() => {
    return () => {
      if (guestbookAlarms && guestbookAlarms.length > 0) markAsRead({ guestbook_id: book.guestbook_id });
    };
  }, []);

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

  const creatorProps = {
    isCreatorOpen,
    creator: book.creator,
    avatar: book.avatar,
    nickname: book.nickname,
    position: '-top-12 -left-16'
  };
  return (
    <div className="relative border-2 w-full flex flex-col items-center gap-2 pt-4 pb-2 px-2 rounded-md">
      {guestbookAlarms?.map((alarm) => alarm.guestbook_id).includes(book.guestbook_id) && (
        <div className="absolute top-1 left-1 rounded-md bg-red-400 px-1 text-white flex items-center">New</div>
      )}
      {creator === book.creator && <DeleteBtn item_id={book.guestbook_id} {...deleteBtnProps} />}
      <div className="w-full flex items-center gap-6 justify-center">
        <div className="w-28 h-28 relative ml-2 flex items-center" {...events()}>
          <AvatarImage src={book.avatar || '/basic_avatar.png'} alt="방명록 아바타" size="7" />
          <HoverCreator {...creatorProps} />
        </div>
        <div
          className={`border rounded w-4/6 h-32 overflow-y-auto resize-none p-2 focus:outline-none ${
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
  );
};

export default SingleGuestBook;
