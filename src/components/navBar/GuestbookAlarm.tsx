'use client';

import { useGetCurrentUser } from '@/customHooks/common';
import { ALARM_GUESTBOOK_QUERY_KEY } from '@/query/alarm/alarmQueryKey';
import { Tables } from '@/type/database';
import { openNewWindow } from '@/utils/utilFns';
import { useQueryClient } from '@tanstack/react-query';
import { MdCancel } from 'react-icons/md';
import type { GuestbookAlarm } from '@/type/alarmType';

const GuestbookAlarm = ({ guestbookAlarms }: { guestbookAlarms: GuestbookAlarm[] | undefined }) => {
  const userData = useGetCurrentUser();
  const queryClient = useQueryClient();

  const goToDetailGuestbook = () => {
    openNewWindow(userData?.user_id);
  };

  const turnOffAlarm = (guestbook_id: string) => {
    queryClient.setQueryData<Tables<'guestbook'>[]>(
      [ALARM_GUESTBOOK_QUERY_KEY],
      (prev) => prev && prev.filter((book) => book.guestbook_id !== guestbook_id)
    );
  };

  return (
    <div className="flex flex-col gap-1">
      {guestbookAlarms?.map((alarm) => (
        <div
          key={alarm.guestbook_id}
          onClick={goToDetailGuestbook}
          className="cursor-pointer w-full flex flex-col rounded hover:bg-gray-100 p-1 gap-0.5 text-left relative"
        >
          <button
            onClick={(event) => {
              event.stopPropagation();
              turnOffAlarm(alarm.guestbook_id);
            }}
            className="w-4 h-4 rounded-full absolute top-[5px] right-[5px] z-[5]"
          >
            <MdCancel className="text-gray-300 hover:text-gray-400" />
          </button>
          <div className="w-full flex text-sm text-gray-500 truncate">
            <p className={'font-semibold text-purple-700'}>{alarm.nickname}</p>
            <p>님이 방명록을 남겼습니다.</p>
          </div>
          <p className="text-xs text-gray-600 break-all whitespace-normal line-clamp-2">
            {alarm.allowShow ? alarm.content : '비공개'}
          </p>
        </div>
      ))}
    </div>
  );
};

export default GuestbookAlarm;
