'use client';

import { openModal } from '@/atom/modalAtom';
import { useAtom } from 'jotai';
import ModalBackground from './ModalBackground';
import { useEffect, useRef } from 'react';

const Modal = () => {
  const [{ isOpen, type, name, text, onFunc, offFunc }, _] = useAtom(openModal);
  const modalRef = useRef<HTMLDivElement>(null);

  const requestModalAnimation = () => {
    requestAnimationFrame(() => {
      if (!modalRef.current) return;
      if (isOpen) {
        modalRef.current.style.transform = 'scale(1)';
        modalRef.current.style.transition = 'transform 0.5s ease-in-out';
      }
    });
  };

  useEffect(() => {
    requestModalAnimation();
  }, [isOpen]);

  if (!isOpen) return;

  return (
    <div>
      <ModalBackground />
      <div ref={modalRef} className="fixed top-1/2 left-1/2 flex flex-col gap-2 z-50 bg-white scale-[0.8]">
        Modal
        <h3>모달 제목: {name}</h3>
        <h5>모달 내용: {text}</h5>
        <div className="flex gap-2">
          <button onClick={onFunc}>확인</button>
          {type === 'alert' ? <></> : <button onClick={offFunc}>취소</button>}
        </div>
      </div>
    </div>
  );
};

export default Modal;
