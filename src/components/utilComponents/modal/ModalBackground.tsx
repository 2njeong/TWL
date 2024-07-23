import { openModal } from '@/atom/modalAtom';
import { ZINDEX } from '@/constants/commonConstants';
import { useAtom } from 'jotai';
import { useEffect, useRef } from 'react';

const ModalBackground = () => {
  const [{ offFunc }, _] = useAtom(openModal);
  const backGroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const backGroundRefElement = backGroundRef.current;
    if (!backGroundRefElement) return;

    const handleModalClose = () => {
      offFunc?.();
    };
    backGroundRefElement.addEventListener('click', handleModalClose);

    return () => {
      backGroundRefElement.removeEventListener('click', handleModalClose);
    };
  }, [offFunc]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black opacity-40`}
      ref={backGroundRef}
      style={{ zIndex: ZINDEX.modalZ - 1 }}
    >
      ModalBackground
    </div>
  );
};

export default ModalBackground;
