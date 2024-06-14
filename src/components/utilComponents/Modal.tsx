'use client';

import { openModal } from '@/atom/modalAtom';
import { useAtom } from 'jotai';

const Modal = () => {
  const [{ isOpen, type, name, text, onFunc, offFunc }, handleOpenModal] = useAtom(openModal);

  // console.log({ isOpen, type, name, text, onFunc, offFunc });

  if (!isOpen)
    return (
      <button
        onClick={() => {
          handleOpenModal({
            type: 'confirm',
            name: '모달제목',
            text: '모달내용',
            onFunc: () => {
              console.log('단단다');
            }
          });
        }}
      >
        모달 열기
      </button>
    );

  return (
    <div className="flex flex-col gap-2">
      Modal
      <h3>{name}</h3>
      <h5>{text}</h5>
      <div className="flex gap-2">
        <button onClick={onFunc}>확인</button>
        {type === 'alert' ? <></> : <button onClick={offFunc}>취소</button>}
      </div>
    </div>
  );
};

export default Modal;
