import NewTodoForm from './NewTodoForm';
import Todos from './Todos';

const TodaysTodo = () => {
  return (
    <div className="border-2 w-full h-[75%] flex flex-col justify-between items-center gap-2 p-4">
      <div className="w-full">
        <h1>Today&apos;s Todolist</h1>
      </div>
      <Todos />
      <NewTodoForm />
    </div>
  );
};

export default TodaysTodo;
