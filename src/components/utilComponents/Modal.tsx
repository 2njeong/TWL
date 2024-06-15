'use client';

import { openModal } from '@/atom/modalAtom';
import { useAtom } from 'jotai';
import ModalBackground from './ModalBackground';
import { useEffect, useRef } from 'react';
import { animated, useTransition } from '@react-spring/web';

const Modal = () => {
  const [{ isOpen, type, name, text, onFunc, offFunc }, _] = useAtom(openModal);
  const modalRef = useRef<HTMLDivElement>(null);

  const transition = useTransition(isOpen, {
    from: { opacity: 0, transform: 'translate3d(-50%, -40%, 0)' },
    enter: { opacity: 1, transform: 'translate3d(-50%, -50%, 0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%, -40%, 0)' }
  });

  const requestModalAnimation = () => {
    requestAnimationFrame(() => {
      if (!modalRef.current) return;
      if (isOpen) {
        modalRef.current.style.transform = 'translate(-50%, -50%)';
        modalRef.current.style.transition = 'transform 0.3s ease-in-out';
        modalRef.current.style.opacity = '1';
      }
    });
  };

  useEffect(() => {
    requestModalAnimation();
  }, [isOpen]);

  if (!isOpen) return;

  return (
    <>
      {/* {transition((style, item) =>
        item ? (
          <>
            <ModalBackground />
            <animated.div
              ref={modalRef}
              className="fixed top-1/2 left-1/2 flex flex-col gap-2 z-50 bg-white"
              style={style}
            >
              Modal
              <h3>모달 제목: {name}</h3>
              <h5>모달 내용: {text}</h5>
              <div className="flex gap-2">
                <button onClick={onFunc}>확인</button>
                {type === 'alert' ? null : <button onClick={offFunc}>취소</button>}
              </div>
            </animated.div>
          </>
        ) : null
      )} */}

      <>
        <ModalBackground />
        <div
          ref={modalRef}
          className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[40%] flex flex-col gap-2 z-50 bg-white opacity-0`}
        >
          Modal
          <h3>모달 제목: {name}</h3>
          <h5>모달 내용: {text}</h5>
          <div className="flex gap-2">
            <button onClick={onFunc}>확인</button>
            {type === 'alert' ? null : <button onClick={offFunc}>취소</button>}
          </div>
        </div>
      </>
    </>
  );
};

export default Modal;
