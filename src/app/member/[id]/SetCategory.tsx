'use client';

import { categoryAtom } from '@/atom/memberAtom';
import { useGetCurrentUser } from '@/customHooks/common';
import { ALARM_GUESTBOOK_QUERY_KEY } from '@/query/alarm/alarmQueryKey';
import { GuestbookAlarm } from '@/type/alarmType';
import { useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';

const Category = ({ id, categories }: { id: string; categories: string[] }) => {
  const [theCategory, setTheCategory] = useAtom(categoryAtom);
  const { user_id } = useGetCurrentUser() || {};
  const queryClient = useQueryClient();
  const guestbookAlarms = queryClient.getQueryData<GuestbookAlarm[]>([ALARM_GUESTBOOK_QUERY_KEY]);

  const handleCategory = (i: number) => {
    setTheCategory(categories[i]);
  };

  return (
    <div className="flex flex-col absolute top-0 right-0 transform translate-x-full">
      {categories.map((category, i) => (
        <button
          key={category}
          className={`relative border rounded px-1 py-0.5 bg-opacity-50 ${category === theCategory && 'bg-gray-200'}`}
          onClick={() => handleCategory(i)}
        >
          {category}
          {id === user_id && category === '방명록' && guestbookAlarms && guestbookAlarms.length > 0 && (
            <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full animate-pulse bg-red-500 flex items-center justify-center"></div>
          )}
        </button>
      ))}
    </div>
  );
};

export default Category;
