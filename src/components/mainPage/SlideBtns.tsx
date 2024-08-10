import { Dispatch, SetStateAction } from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

const SlideBtns = ({ picIdx, setPicIdx }: { picIdx: number; setPicIdx: Dispatch<SetStateAction<number>> }) => {
  const handelPicIdx = (upDown: string) => {
    if (upDown === 'up') {
      setPicIdx((prev) => Math.min(prev + 1, 3));
    } else {
      setPicIdx((prev) => Math.max(0, prev - 1));
    }
  };

  return (
    <div className="absolute top-1/2 w-full flex justify-between z-[10] px-8">
      <div className="w-8 h-8">
        {picIdx > 0 && (
          <button
            onClick={() => handelPicIdx('down')}
            className={`w-8 h-8 rounded-full hover:bg-red-100 flex items-center justify-center`}
          >
            <MdNavigateBefore className="text-2xl text-red-500" />
          </button>
        )}
      </div>
      <div className="w-8 h-8">
        {picIdx < 3 && (
          <button
            onClick={() => handelPicIdx('up')}
            className="w-8 h-8 rounded-full hover:bg-green-100 flex items-center justify-center text-lg"
          >
            <MdNavigateNext className="text-2xl text-green-500" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SlideBtns;
