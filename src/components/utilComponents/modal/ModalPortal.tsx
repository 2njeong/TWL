'use client';

import { openModal } from '@/atom/modalAtom';
import { useAtom } from 'jotai';
import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

const ModalPortal = ({ children }: PropsWithChildren) => {
  const [{ elementId }, _] = useAtom(openModal);
  const element = document.getElementById(elementId);

  console.log('elementId =>', elementId);
  console.log('element =>', element);

  return element ? createPortal(children, element) : <></>;
};

export default ModalPortal;
