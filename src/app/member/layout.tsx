import { PropsWithChildren } from 'react';

const MemberLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-screen flex flex-col justify-center">
      <div className="w-full max-w-[1080px] h-full max-h-[85%] mx-auto flex flex-col justify-center ">{children}</div>
      <div id="new-root"></div>
    </div>
  );
};
export default MemberLayout;
