'use client';
import { getToday } from '@/utils/utilFns';
import NewTodoForm from './NewTodoForm';
import Todos from './Todos';
import { useQueryClient } from '@tanstack/react-query';
import { SevenDaysTodolist } from '@/type/memberType';
import { TODOLIST_QUERY_KEY } from '@/query/member/memberQueryKey';
import { Tables } from '@/type/database';
import { THAT_USER_QUERY_KEY } from '@/query/auth/authQueryKeys';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { dayAtom, todolistAtom } from '@/atom/memberAtom';

const TodaysTodo = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const [{ user_id: thatUserID }] = queryClient.getQueryData<Tables<'users'>[]>([THAT_USER_QUERY_KEY, id]) ?? [];
  const sevenDaysTodolist = queryClient.getQueryData<SevenDaysTodolist[]>([TODOLIST_QUERY_KEY, thatUserID]);
  const todos = sevenDaysTodolist?.find((todolist) => todolist.day === getToday())?.todos ?? [];
  const [day, setDay] = useAtom(dayAtom);
  const [todolist, setTodolist] = useAtom(todolistAtom);

  useEffect(() => {
    setTodolist(todos);
  }, [todos]);

  useEffect(() => {
    setDay(getToday());
  }, []);

  return (
    <div className="border-2 w-full h-[75%] flex flex-col justify-between items-center gap-2 p-4">
      <div className="w-full flex justify-between items-center">
        <h1>Today&apos;s Todolist</h1>
        <h1>{day}</h1>
      </div>
      <Todos thatUserID={thatUserID} />

      <NewTodoForm id={id} />
    </div>
  );
};

export default TodaysTodo;
