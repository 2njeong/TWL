'use client';

import { useState } from 'react';
import { CiCirclePlus } from 'react-icons/ci';
import { MdCancel } from 'react-icons/md';

const SelectInput = () => {
  const [inputArr, setInputArr] = useState([1]);

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
            <input placeholder={`보기 ${idx + 1}`} name="보기"></input>
            <button onClick={() => minusInputCount(idx)}>
              <MdCancel />
            </button>
          </div>
          <button className={`mx-auto ${idx + 1 < inputArr.length ? 'hidden' : null}`} onClick={plusInputCount}>
            <CiCirclePlus />
          </button>
        </div>
      ))}
    </div>
  );
};

export default SelectInput;
