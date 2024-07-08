import Modal from '@/components/utilComponents/modal/Modal';
import { PropsWithChildren } from 'react';

const MemberLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Modal />
      <div className="w-full max-w-[1200px] w-9/12 mx-auto flex flex-col justify-center">
        멤버레이아웃
        {children}
      </div>
    </>
  );
};
export default MemberLayout;
