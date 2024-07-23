'use client';

import { openModal } from '@/atom/modalAtom';
import { useAtom } from 'jotai';
import ModalBackground from './ModalBackground';
import { useEffect, useRef } from 'react';
// import { animated, useTransition } from '@react-spring/web';
import { ZINDEX } from '@/constants/commonConstants';
import { Viewer } from '@toast-ui/react-editor';
import { htmlTagRegex } from '@/utils/common';
import ModalPortal from './ModalPortal';

const Modal = () => {
  const [{ elementId, isOpen, type, title, content, onFunc, offFunc }, _] = useAtom(openModal);
  const modalRef = useRef<HTMLDivElement>(null);

  // const transition = useTransition(isOpen, {
  //   from: { opacity: 0, transform: 'translate3d(-50%, -60%, 0)' },
  //   enter: { opacity: 1, transform: 'translate3d(-50%, -50%, 0)' },
  //   leave: { opacity: 0, transform: 'translate3d(-50%, -60%, 0)' }
  // });

  const requestModalAnimation = () => {
    requestAnimationFrame(() => {
      if (!modalRef.current) return;
      if (isOpen) {
        modalRef.current.style.transform = 'translate(-50%, -40%)';
        modalRef.current.style.opacity = '1';
        modalRef.current.style.transition = 'transform 0.3s ease-in-out';
      }
    });
  };

  useEffect(() => {
    requestModalAnimation();
  }, [isOpen]);

  if (!isOpen) return;

  return (
    <>
      <ModalPortal>
        <ModalBackground />
        <div
          ref={modalRef}
          className={`min-w-[40%]  ${elementId === 'new-root' ? 'max-w-[50%]' : `max-w-[80%]`} fixed z-[${
            ZINDEX.modalZ
          }]
          max-h-[80vh] top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 bg-white opacity-0 p-4 overflow-hidden`}
        >
          <button
            className="ml-auto w-6 h-6 rounded-full flex justify-center items-center hover:bg-gray-100"
            onClick={offFunc}
          >
            X
          </button>
          <div className="flex flex-col gap-4 p-2 overflow-y-auto max-h-[calc(80vh-4rem)]">
            <h3 className="text-2xl font-bold">{title}</h3>
            {elementId === 'new-root' ? (
              // 새로운 창에서 모달 content
              <p className="w-full h-full break-all whitespace-normal">{content}</p>
            ) : // 원래 DOM에서의 모달 content
            content && htmlTagRegex.test(content) ? (
              <Viewer initialValue={content} />
            ) : (
              <p className="w-full h-full break-all whitespace-normal">{content}</p>
            )}
          </div>
          <div className="flex gap-3 justify-end">
            <button onClick={onFunc}>확인</button>
            {type === 'alert' ? null : <button onClick={offFunc}>취소</button>}
          </div>
        </div>
      </ModalPortal>
      {/* {transition((style, item) =>
        item ? (
          <>
            <ModalBackground />
            <animated.div
              ref={modalRef}
              className="w-2/5 h-2/5 fixed top-1/2 left-1/2 flex flex-col gap-2 z-50 bg-white opacity-0 p-4"
              style={style}
            >
              Modal
              <h3>모달 제목: {title}</h3>
              <h5>모달 내용: {content}</h5>
              <div className="flex gap-2">
                <button onClick={onFunc}>확인</button>
                {type === 'alert' ? null : <button onClick={offFunc}>취소</button>}
              </div>
            </animated.div>
          </>
        ) : null
      )} */}
    </>
  );
};

export default Modal;
