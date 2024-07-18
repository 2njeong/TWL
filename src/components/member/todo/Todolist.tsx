'use client';

import { useQueryClient } from '@tanstack/react-query';
import SevenDaysTodoList from './SevenDaysTodolist';
import TodaysTodo from './TodaysTodo';
import { Tables } from '@/type/database';
import { THAT_USER_QUERY_KEY } from '@/query/auth/authQueryKeys';
import { useFetchTodolist } from '@/query/useQueries/useMemberQuery';

const Todolist = ({ id }: { id: string }) => {
  console.log('id =>', id);
  const queryClient = useQueryClient();
  const [{ user_id: thatUserID }] = queryClient.getQueryData<Tables<'users'>[]>([THAT_USER_QUERY_KEY, id]) ?? [];
  const { data, isLoading } = useFetchTodolist(thatUserID);
  console.log('todolist =>', data);

  console.log(new Date().toISOString());
  return (
    <div className="w-full h-[90%]">
      <TodaysTodo />
      <SevenDaysTodoList />
    </div>
  );
};

export default Todolist;
