import NewTodoForm from './NewTodoForm';
import { MdCancel } from 'react-icons/md';

const TodaysTodo = () => {
  const todolist = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19'
  ];

  return (
    <div className="border-2 w-full h-[75%] flex flex-col justify-between items-center gap-2 p-4">
      <div className="w-full">
        <h1>Today&apos;s Todolist</h1>
      </div>
      <form className="border w-[70%] h-full overflow-y-auto py-2 px-4 flex flex-col gap-1">
        {todolist.map((todo) => (
          <label key={todo} className="w-full flex items-center justify-between px-2">
            <div className="flex gap-1">
              <input type="checkbox" name="check" checked={true}></input>
              <h4>{todo}</h4>
            </div>
            <MdCancel className="cursor-pointer text-gray-400 hover:text-gray-300" />
          </label>
        ))}
      </form>
      <NewTodoForm />
    </div>
  );
};

export default TodaysTodo;
