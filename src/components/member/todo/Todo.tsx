import TodaysTodo from './TodaysTodo';
import Todolist from './Todolist';

const Todo = () => {
  return (
    <div className="w-full h-[90%]">
      <TodaysTodo />
      <Todolist />
    </div>
  );
};

export default Todo;
