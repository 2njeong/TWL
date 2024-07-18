import { getToday } from '@/utils/utilFns';
import NewTodoForm from './NewTodoForm';
import Todos from './Todos';

const TodaysTodo = ({ id }: { id: string }) => {
  return (
    <div className="border-2 w-full h-[75%] flex flex-col justify-between items-center gap-2 p-4">
      <div className="w-full flex justify-between items-center">
        <h1>Today&apos;s Todolist</h1>
        <h1>{getToday()}</h1>
      </div>
      <Todos id={id} />
      <NewTodoForm id={id} />
    </div>
  );
};

export default TodaysTodo;
