'use client';

import { openModal } from '@/atom/modalAtom';
import { useAtom } from 'jotai';
import ModalBackground from './ModalBackground';
import { useEffect, useRef } from 'react';
import { animated, useTransition } from '@react-spring/web';
import { ZINDEX } from '@/constants/commonConstants';
import { Viewer } from '@toast-ui/react-editor';
import { htmlTagRegex } from '@/utils/common';

const Modal = () => {
  const [{ layer, isOpen, type, title, content, onFunc, offFunc }, _] = useAtom(openModal);
  const modalRef = useRef<HTMLDivElement>(null);

  const transition = useTransition(isOpen, {
    from: { opacity: 0, transform: 'translate3d(-50%, -60%, 0)' },
    enter: { opacity: 1, transform: 'translate3d(-50%, -50%, 0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%, -60%, 0)' }
  });

  const requestModalAnimation = () => {
    requestAnimationFrame(() => {
      if (!modalRef.current) return;
      if (isOpen) {
        modalRef.current.style.transform = 'translate(-50%, -60%)';
        modalRef.current.style.opacity = '1';
        modalRef.current.style.transition = 'transform 0.3s ease-in-out';
      }
    });
  };

  useEffect(() => {
    requestModalAnimation();
  }, [isOpen]);

  if (!isOpen) return;

  console.log('content =>', content);
  // console.log('content =>', content[0]);
  return (
    <>
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

      <>
        <ModalBackground />
        <div
          ref={modalRef}
          className={`min-w-[40%]  ${
            layer > 0 ? 'max-w-[50%]' : 'max-w-[80%]'
          } max-h-[80vh] fixed top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 bg-white opacity-0 p-4 z-[${
            layer > 0 ? ZINDEX.upperModalZ : ZINDEX.modalZ
          }] overflow-hidden`}
        >
          <button className="w-full flex justify-end items-center" onClick={offFunc}>
            x
          </button>
          <div className="flex flex-col gap-4 p-2 overflow-y-auto max-h-[calc(80vh-4rem)]">
            <h3 className="text-2xl font-bold">{title}</h3>
            {layer > 0 ? (
              <p className="w-full h-full break-all whitespace-normal">{content}</p>
            ) : content && htmlTagRegex.test(content) ? (
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
      </>
    </>
  );
};

export default Modal;
