import Modal from '@/components/utilComponents/modal/Modal';
import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';
const ModalWrapper = dynamic(() => import('@/components/utilComponents/modal/Modal'), { ssr: false });

const MemberLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <div className="w-full max-w-[1080px] h-full max-h-[600px] mx-auto flex flex-col justify-center ">
        멤버레이아웃
        {children}
      </div>
      <div id="new-root"></div>
    </div>
  );
};
export default MemberLayout;
