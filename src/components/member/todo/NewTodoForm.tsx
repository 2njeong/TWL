'use client';

import { submitTodolist } from '@/app/member/action';
import SubmitBtn from '@/components/makequiz/SubmitBtn';
import { CURRENT_USER_QUERY_KEY } from '@/query/auth/authQueryKeys';
import { Tables } from '@/type/database';
import { useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { CiCirclePlus } from 'react-icons/ci';

const NewTodoForm = () => {
  const todoFormRef = useRef<HTMLFormElement | null>(null);
  const queryClient = useQueryClient();
  const { user_id, avatar } = queryClient.getQueryData<Tables<'users'>>([CURRENT_USER_QUERY_KEY]) ?? {};

  const handleSubmitTodo = async (data: FormData) => {
    const boundSubmitTodolist = submitTodolist.bind(null, user_id);
    const result = await boundSubmitTodolist(data);
    if (result) {
      alert(result.message);
      return;
    }
    todoFormRef.current?.reset();
  };

  const btnProps = {
    sectionClasName: 'flex items-center',
    buttonClassName: 'text-3xl cursor-pointer text-red-500 hover:text-gray-500',
    pendingText: <CiCirclePlus />,
    doneText: <CiCirclePlus />
  };

  return (
    <form
      ref={todoFormRef}
      action={handleSubmitTodo}
      className="border w-[70%] h-[30%] flex justify-center items-center gap-2 px-8 py-4"
    >
      <input name="todo_item" placeholder="New" className="w-11/12 border-b-4 focus:outline-none"></input>
      <SubmitBtn btnProps={btnProps} />
    </form>
  );
};

export default NewTodoForm;
