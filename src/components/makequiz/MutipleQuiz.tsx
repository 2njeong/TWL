'use client';

import { inputList } from '@/atom/quizAtom';
import { useAtom } from 'jotai';
import { CiCirclePlus } from 'react-icons/ci';
import { MdCancel } from 'react-icons/md';

const MultipleQuiz = () => {
  const [inputArr, setInputArr] = useAtom(inputList);

  const plusInputCount = () => {
    setInputArr((prev) => (prev.length < 5 ? [...prev, prev.length + 1] : prev));
  };

  const minusInputCount = (idx: number) => {
    // setInputArr((prev) => (prev.length > 1 ? [...prev.slice(0, idx), ...prev.slice(idx + 1, prev.length)] : prev));
    setInputArr((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== idx) : prev));
  };

  return (
    <div className="flex flex-col gap-2">
      {inputArr.map((item, idx) => (
        <div key={item} className="flex flex-col gap-2">
          <div className="flex gap-1 items-center">
            <input placeholder={`보기 ${idx + 1}`} name={`select ${idx + 1}`}></input>
            <button formAction={() => minusInputCount(idx)}>
              <MdCancel />
            </button>
          </div>
          <button className={`mx-auto ${idx + 1 < inputArr.length ? 'hidden' : null}`} formAction={plusInputCount}>
            <CiCirclePlus />
          </button>
        </div>
      ))}
    </div>
  );
};

export default MultipleQuiz;
