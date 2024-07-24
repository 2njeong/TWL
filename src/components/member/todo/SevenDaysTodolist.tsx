'use client';

import { dayAtom, todolistAtom } from '@/atom/memberAtom';
import { useGetSevenDaysTodolist, useGetThatUser } from '@/customHooks/common';
import { getToday } from '@/utils/utilFns';
import { useAtom, useSetAtom } from 'jotai';

const SevenDaysTodoList = ({ id }: { id: string }) => {
  const setTodolist = useSetAtom(todolistAtom);
  const [_, setDay] = useAtom(dayAtom);
  const { user_id: thatUserID } = useGetThatUser(id);
  const sevenDaysTodolist = useGetSevenDaysTodolist(thatUserID);
  const restOfTodolist =
    sevenDaysTodolist?.filter((todolist) => todolist.day !== getToday()).sort((a, b) => b.day.localeCompare(a.day)) ??
    [];

  const changeTodolist = (day: string) => {
    setTodolist(sevenDaysTodolist?.find((todolist) => todolist.day === day)?.todos ?? []);
    setDay(day);
  };

  return (
    <div className="border w-full h-[35%]">
      <div className="overflow-x-auto w-full h-full flex items-center">
        <div className="flex gap-4 w-full px-4">
          <button onClick={() => changeTodolist(getToday())} className="border-4 rounded w-48 h-20 flex-shrink-0">
            {getToday()}
          </button>
          {restOfTodolist.map((todolist) => (
            <button
              key={todolist.day}
              onClick={() => changeTodolist(todolist.day)}
              className="border-4 rounded w-48 h-20 flex-shrink-0"
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
