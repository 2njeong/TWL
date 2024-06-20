import { openModal } from '@/atom/modalAtom';
import { ModalProps } from '@/type/modalType';
import { useAtom } from 'jotai';

const OpenModalBtn = ({
  children,
  modalProps,
  moreFunc,
  className
}: {
  children: React.ReactNode;
  modalProps: ModalProps;
  moreFunc?: any;
  className: string;
}) => {
  const [_, handleOpenModal] = useAtom(openModal);

  return (
    <button
      className={className}
      onClick={() => {
        handleOpenModal(modalProps);
        if (moreFunc) moreFunc();
      }}
    >
      {children}
    </button>
  );
};

export default OpenModalBtn;
