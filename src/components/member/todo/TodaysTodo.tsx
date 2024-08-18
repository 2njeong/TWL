'use client';
import { getToday } from '@/utils/utilFns';
import NewTodoForm from './NewTodoForm';
import Todos from './Todos';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { dayAtom, todolistAtom } from '@/atom/memberAtom';
import { useGetSevenDaysTodolist, useGetThatUser } from '@/customHooks/common';

const TodaysTodo = ({ id }: { id: string }) => {
  const [day, setDay] = useAtom(dayAtom);
  const [_, setTodolist] = useAtom(todolistAtom);
  const { user_id: thatUserID } = useGetThatUser(id);
  const sevenDaysTodolist = useGetSevenDaysTodolist(thatUserID);
  const todos =
    sevenDaysTodolist?.find((todolist) => todolist.day === day)?.todos.filter((todo) => !todo.isDeleted) ?? [];

  useEffect(() => {
    setTodolist(todos);
  }, [sevenDaysTodolist]);

  useEffect(() => {
    setDay(getToday());
  }, []);

  return (
    <div className="border-2 w-full h-[75%] flex flex-col justify-between items-center gap-2 p-4">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-lg font-semibold">Today&apos;s Todolist</h1>
        <h1>{day}</h1>
      </div>
      <Todos id={id} />
      <NewTodoForm id={id} />
    </div>
  );
};

export default TodaysTodo;
