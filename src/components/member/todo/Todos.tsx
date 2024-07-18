import SubmitBtn from '@/components/makequiz/SubmitBtn';
import { ChangeEvent, useState } from 'react';
import { MdCancel } from 'react-icons/md';

const Todos = () => {
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

  const [checkedList, setCheckedList] = useState<boolean[]>(Array.from({ length: todolist.length }, () => false));

  console.log('checkedList =>', checkedList);

  const handleCheckedList = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('event =>', e);
    console.log('e.target.value =>', e.target.value);
    console.log('e.target.checked =>', e.target.checked);
  };

  const btnProps = {
    formId: 'todosForm',
    sectionClasName: 'border w-full flex justify-end sticky top-0 shrink-0 backdrop-blur-lg',
    buttonClassName: 'w-20 border rounded px-1 py-0.5 flex items-center justify-center',
    pendingText: '...',
    doneText: '업데이트'
  };

  return (
    <form id="todosForm" className="border w-[70%] h-full overflow-y-auto pt-1 pb-2 px-4 flex flex-col gap-1">
      <SubmitBtn btnProps={btnProps} />
      {todolist.map((todo) => (
        <label key={todo} className="w-full flex items-center justify-between px-2">
          <div className="flex gap-1">
            <input type="checkbox" name="check" defaultChecked={true} onChange={(e) => handleCheckedList(e)}></input>
            <h4>{todo}</h4>
          </div>
          <MdCancel className="cursor-pointer text-gray-400 hover:text-gray-300" />
        </label>
      ))}
    </form>
  );
};

export default Todos;
