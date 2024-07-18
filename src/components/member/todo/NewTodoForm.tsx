'use client';

import { submitTodolist } from '@/app/member/action';
import { dayAtom } from '@/atom/memberAtom';
import SubmitBtn from '@/components/makequiz/SubmitBtn';
import { CURRENT_USER_QUERY_KEY, THAT_USER_QUERY_KEY } from '@/query/auth/authQueryKeys';
import { TODOLIST_QUERY_KEY } from '@/query/member/memberQueryKey';
import { Tables } from '@/type/database';
import { getToday } from '@/utils/utilFns';
import { useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useRef } from 'react';
import { CiCirclePlus } from 'react-icons/ci';
import { HiEllipsisHorizontal } from 'react-icons/hi2';

const NewTodoForm = ({ id }: { id: string }) => {
  const [day, _] = useAtom(dayAtom);
  const todoFormRef = useRef<HTMLFormElement | null>(null);
  const queryClient = useQueryClient();
  const { user_id } = queryClient.getQueryData<Tables<'users'>>([CURRENT_USER_QUERY_KEY]) ?? {};
  const [{ user_id: thatUserID }] = queryClient.getQueryData<Tables<'users'>[]>([THAT_USER_QUERY_KEY, id]) ?? [];

  const handleSubmitTodo = async (data: FormData) => {
    const boundSubmitTodolist = submitTodolist.bind(null, user_id);
    const result = await boundSubmitTodolist(data);
    if (result) {
      alert(result.message);
      return;
    }
    todoFormRef.current?.reset();
    queryClient.invalidateQueries({ queryKey: [TODOLIST_QUERY_KEY, thatUserID] });
  };

  const btnProps = {
    formId: 'newTodoForm',
    disabledCondition: user_id !== thatUserID,
    sectionClasName: 'flex items-center',
    buttonClassName: 'text-3xl cursor-pointer text-red-500 hover:text-gray-500',
    pendingText: <HiEllipsisHorizontal />,
    doneText: <CiCirclePlus />
  };

  return (
    <>
      {user_id === thatUserID && day === getToday() && (
        <form
          id="newTodoForm"
          ref={todoFormRef}
          action={handleSubmitTodo}
          className="border rounded-md w-[70%] h-[30%] flex justify-center items-center gap-2 px-8 py-4 shadow-lg"
        >
          <input
            name="todo_item"
            placeholder="New"
            disabled={user_id !== thatUserID}
            className="w-11/12 border-b-4 focus:outline-none"
          ></input>
          <SubmitBtn btnProps={btnProps} />
        </form>
      )}
    </>
  );
};

export default NewTodoForm;
