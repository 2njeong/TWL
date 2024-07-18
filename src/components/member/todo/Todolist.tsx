'use client';

import { useQueryClient } from '@tanstack/react-query';
import SevenDaysTodoList from './SevenDaysTodolist';
import TodaysTodo from './TodaysTodo';
import { Tables } from '@/type/database';
import { THAT_USER_QUERY_KEY } from '@/query/auth/authQueryKeys';
import { useFetchTodolist } from '@/query/useQueries/useMemberQuery';

const Todolist = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const [{ user_id: thatUserID }] = queryClient.getQueryData<Tables<'users'>[]>([THAT_USER_QUERY_KEY, id]) ?? [];
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
