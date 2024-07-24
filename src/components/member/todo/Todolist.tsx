'use client';

import SevenDaysTodoList from './SevenDaysTodolist';
import TodaysTodo from './TodaysTodo';
import { useFetchTodolist } from '@/query/useQueries/useMemberQuery';
import { useGetThatUser } from '@/customHooks/common';

const Todolist = ({ id }: { id: string }) => {
  const { user_id: thatUserID } = useGetThatUser(id);
  const { todolistLoading } = useFetchTodolist(thatUserID);

  if (todolistLoading) return <div>로딩중..</div>;
  return (
    <div className="w-full h-full flex flex-col gap-4 justify-between items-center">
      <TodaysTodo id={id} />
      <SevenDaysTodoList id={id} />
    </div>
  );
};

export default Todolist;
