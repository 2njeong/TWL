import { openModal } from '@/atom/modalAtom';
import { ZINDEX } from '@/constants/commonConstants';
import { useAtom } from 'jotai';
import { useEffect, useRef } from 'react';

const ModalBackground = () => {
  const [{ layer, offFunc }, _] = useAtom(openModal);
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
      className={`fixed w-full h-full bg-black opacity-40 z-[${
        layer > 0 ? ZINDEX.upperModalZ - 1 : ZINDEX.modalZ - 1
      }]`}
      ref={backGroundRef}
    >
      ModalBackground
    </div>
  );
};

export default ModalBackground;
