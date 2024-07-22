import { updateTodolistServerAction } from '@/app/member/action';
import { todolistAtom } from '@/atom/memberAtom';
import SubmitBtn from '@/components/makequiz/SubmitBtn';
import { CURRENT_USER_QUERY_KEY } from '@/query/auth/authQueryKeys';
import { TODOLIST_QUERY_KEY } from '@/query/member/memberQueryKey';
import { Tables } from '@/type/database';
import { SevenDaysTodolist } from '@/type/memberType';
import { getToday } from '@/utils/utilFns';
import { useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { ChangeEvent } from 'react';
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import { MdCancel } from 'react-icons/md';

const Todos = ({ thatUserID }: { thatUserID: string }) => {
  const [todolist, setTodolist] = useAtom(todolistAtom);
  const queryClient = useQueryClient();
  const { user_id } = queryClient.getQueryData<Tables<'users'>>([CURRENT_USER_QUERY_KEY]) ?? {};
  const sevenDaysTodolist = queryClient.getQueryData<SevenDaysTodolist[]>([TODOLIST_QUERY_KEY, thatUserID]);
  const todos = sevenDaysTodolist?.find((todolist) => todolist.day === getToday())?.todos ?? [];

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
    sectionClasName: 'w-full flex justify-between items-center sticky top-0 shrink-0 backdrop-blur-lg',
    sectionP: '할 일을 수정한 뒤에는 반드시 업데이트 버튼을 눌러주세요!',
    sectionPClassName: 'text-gray-500 text-xs',
    buttonClassName: 'w-20 border rounded px-1 py-0.5 flex items-center justify-center',
    pendingText: <HiEllipsisHorizontal />,
    doneText: '업데이트'
  };

  return (
    <form
      id="todosForm"
      action={updateTodolist}
      className="border-2 rounded-md w-[70%] h-full overflow-y-auto pt-1 pb-2 px-4 flex flex-col gap-1"
      style={{ paddingTop: user_id !== thatUserID ? '1.5rem' : '' }}
    >
      <div className="w-full flex justify-between items-center">
        {user_id === thatUserID && <SubmitBtn btnProps={btnProps} />}
      </div>

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
                ></input>
                <h4>{todo.todo_item}</h4>
              </div>
              <MdCancel
                className="cursor-pointer text-gray-400 hover:text-gray-300"
                onClick={() => handleTodolist({ todo_id: todo.todo_id })}
              />
            </div>
          )
      )}
    </form>
  );
};

export default Todos;
