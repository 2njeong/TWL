import { PropsWithChildren } from 'react';

const MemberLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <div className="w-full max-w-[1080px] h-full max-h-[600px] mx-auto flex flex-col justify-center ">
        새로운 창{children}
      </div>
      <div id="new-root"></div>
    </div>
  );
};
export default MemberLayout;
