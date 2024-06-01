'use client';

import { useState } from 'react';
import { CiCirclePlus } from 'react-icons/ci';
import { MdCancel } from 'react-icons/md';

const SelectInput = () => {
  const [inputCount, setInputCount] = useState(1);

  const plusInputCount = () => {
    setInputCount((prev) => Math.min(5, prev + 1));
  };

  const minusInputCount = () => {
    setInputCount((prev) => Math.max(1, prev - 1));
  };

  return (
    <div className="flex flex-col gap-2">
      {Array(inputCount)
        .fill(1)
        .map((_, idx) => (
          <div key={idx} className="flex gap-1 items-center">
            <input></input>
            <button onClick={minusInputCount}>
              <MdCancel />
            </button>
          </div>
        ))}

      <button className="mx-auto" onClick={plusInputCount}>
        <CiCirclePlus />
      </button>
    </div>
  );
};

export default SelectInput;
