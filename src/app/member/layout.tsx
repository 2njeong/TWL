import Modal from '@/components/utilComponents/modal/Modal';
import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';
const ModalWrapper = dynamic(() => import('@/components/utilComponents/modal/Modal'), { ssr: false });

const MemberLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ModalWrapper />
      <div className="w-full max-w-[1200px] w-9/12 mx-auto flex flex-col justify-center">
        멤버레이아웃
        {children}
      </div>
    </>
  );
};
export default MemberLayout;
