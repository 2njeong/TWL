'use client';

import { openModal } from '@/atom/modalAtom';
import { useAtom } from 'jotai';
import ModalBackground from './ModalBackground';

const Modal = () => {
  const [{ isOpen, type, name, text, onFunc, offFunc }, _] = useAtom(openModal);

  if (!isOpen) return;

  return (
    <>
      <ModalBackground />
      <div className="fixed top-1/2 left-1/2 flex flex-col gap-2 z-50 ">
        Modal
        <h3>모달 제목: {name}</h3>
        <h5>모달 내용: {text}</h5>
        <div className="flex gap-2">
          <button onClick={onFunc}>확인</button>
          {type === 'alert' ? <></> : <button onClick={offFunc}>취소</button>}
        </div>
      </div>
    </>
  );
};

export default Modal;
