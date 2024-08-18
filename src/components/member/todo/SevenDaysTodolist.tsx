'use client';

import { dayAtom, todolistAtom } from '@/atom/memberAtom';
import { useGetCurrentUser, useGetSevenDaysTodolist, useGetThatUser } from '@/customHooks/common';
import { TODOLIST_QUERY_KEY } from '@/query/member/memberQueryKey';
import { Todolist } from '@/type/memberType';
import { getToday } from '@/utils/utilFns';
import { useQueryClient } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';

const SevenDaysTodoList = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const setTodolist = useSetAtom(todolistAtom);
  const [_, setDay] = useAtom(dayAtom);
  const { user_id } = useGetCurrentUser() || {};
  const { user_id: thatUserID } = useGetThatUser(id);
  const sevenDaysTodolist = useGetSevenDaysTodolist(thatUserID);
  const restOfTodolist =
    sevenDaysTodolist?.filter((todolist) => todolist.day !== getToday()).sort((a, b) => b.day.localeCompare(a.day)) ??
    [];

  const changeTodolist = (day: string) => {
    setTodolist(sevenDaysTodolist?.find((todolist) => todolist.day === day)?.todos ?? []);
    setDay(day);
  };

  const fetchMoreTodolist = async () => {
    if (sevenDaysTodolist) {
      const response = await fetch(
        `/member/api?type=fetchMoretodolist&day=${sevenDaysTodolist[0].day}&user_id=${thatUserID}`
      );
      if (!response.ok) {
        throw new Error('ThatUser_s todolist response was not ok');
      }
      const data = await response.json();
      if (data.length > 0) {
        queryClient.setQueryData([TODOLIST_QUERY_KEY, thatUserID], (prev: Todolist[]) =>
          [...prev, ...data].sort((a, b) => a.day.localeCompare(b.day))
        );
      } else {
        alert(`${sevenDaysTodolist[0].day}보다 이전 todolist가 없습니다.`);
      }
    }
  };

  return (
    <div className="border w-full h-44 relative">
      {user_id === id && (
        <button onClick={fetchMoreTodolist} className="absolute right-2 top-2 border rounded-md px-1 hover:bg-gray-200">
          이전 7일
        </button>
      )}
      <div className="overflow-x-auto w-full h-full flex items-center">
        <div className="flex gap-4 w-full px-4">
          <button
            onClick={() => changeTodolist(getToday())}
            className="border-4 rounded w-40 h-16 flex-shrink-0 hover:bg-gray-100"
          >
            {getToday()}
          </button>
          {restOfTodolist.map((todolist) => (
            <button
              key={todolist.day}
              onClick={() => changeTodolist(todolist.day)}
              className="border-4 rounded w-40 h-16 flex-shrink-0 hover:bg-gray-100"
            >
              {todolist.day}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SevenDaysTodoList;
