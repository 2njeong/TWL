import { updateTodolistServerAction } from '@/app/member/action';
import { dayAtom, todolistAtom } from '@/atom/memberAtom';
import SubmitBtn from '@/components/makequiz/SubmitBtn';
import { useGetCurrentUser, useGetSevenDaysTodolist, useGetThatUser } from '@/customHooks/common';
import { TODOLIST_QUERY_KEY } from '@/query/member/memberQueryKey';
import { getToday } from '@/utils/utilFns';
import { useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { ChangeEvent, useEffect, useState } from 'react';
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import { MdCancel } from 'react-icons/md';

const Todos = ({ id }: { id: string }) => {
  const [todolist, setTodolist] = useAtom(todolistAtom);
  const [day, _] = useAtom(dayAtom);
  const [animating, setAnimating] = useState(true);
  const { user_id: thatUserID } = useGetThatUser(id);
  const { user_id } = useGetCurrentUser() ?? {};
  const sevenDaysTodolist = useGetSevenDaysTodolist(thatUserID);
  const todos = sevenDaysTodolist?.find((todolist) => todolist.day === day)?.todos ?? [];
  const queryClient = useQueryClient();

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
    }, 300);
  }, []);

  const handleTodolist = ({ e, todo_id }: { e?: ChangeEvent<HTMLInputElement>; todo_id: string }) => {
    if (user_id !== thatUserID) return;
    setTodolist(
      todolist.map((todo) =>
        todo.todo_id === todo_id ? (e ? { ...todo, done: e.target.checked } : { ...todo, isDeleted: true }) : todo
      )
    );
  };

  const updateTodolist = async (data: FormData) => {
    if (todolist.every((todo, i) => todo.done === todos[i].done && todo.isDeleted === todos[i].isDeleted)) {
      alert('변경사항이 없습니다.');
      return;
    }
    const todoObj = {
      todolist
    };
    await updateTodolistServerAction(todoObj, data);
    queryClient.invalidateQueries({ queryKey: [TODOLIST_QUERY_KEY, thatUserID] });
  };

  const btnProps = {
    formId: 'todosForm',
    sectionClassName: 'w-full flex justify-end items-center sticky top-0 shrink-0 backdrop-blur-lg',
    buttonClassName: 'w-20 border rounded px-1 py-0.5 flex items-center justify-center hover:bg-gray-100',
    pendingText: <HiEllipsisHorizontal />,
    doneText: '업데이트'
  };

  return (
    <form
      id="todosForm"
      action={updateTodolist}
      className="border-2 rounded-md w-[70%] h-full overflow-y-auto pt-1 pb-2 px-2 flex flex-col gap-1"
      style={{ paddingTop: user_id !== thatUserID ? '1.5rem' : '' }}
    >
      {user_id === thatUserID && todolist.length > 0 && <SubmitBtn btnProps={btnProps} />}
      {todolist.map(
        (todo) =>
          !todo.isDeleted && (
            <div key={todo.todo_id} className="w-full flex items-center justify-between px-2">
              <div className="flex gap-1">
                <input
                  type="checkbox"
                  name="check"
                  checked={todo.done}
                  disabled={user_id !== thatUserID}
                  onChange={(e) => handleTodolist({ e, todo_id: todo.todo_id })}
                />
                <h4>{todo.todo_item}</h4>
              </div>
              <MdCancel
                className="cursor-pointer text-gray-400 hover:text-gray-300"
                onClick={() => handleTodolist({ todo_id: todo.todo_id })}
              />
            </div>
          )
      )}
      {user_id === thatUserID && (
        <div
          className={`w-full flex justify-center items-center mt-auto text-red-500 text-xs ${
            animating && 'animate-vibration'
          } sticky bottom-0 shrink-0 bg-white`}
        >
          <p>할 일을&nbsp;</p>
          <p className="font-semibold">수정&nbsp;</p>
          <p>한 뒤에는 반드시&nbsp;</p>
          <p className="flex items-center justify-center font-semibold px-1 border-2 border-red-500 rounded-lg">
            업데이트
          </p>
          <p>&nbsp;버튼을 눌러주세요!</p>
        </div>
      )}
    </form>
  );
};

export default Todos;
