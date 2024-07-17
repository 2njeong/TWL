import { PropsWithChildren } from 'react';

const MemberLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full h-full flex flex-col justify-center">
      <div className="w-full h-full max-h-[85%] flex flex-col justify-center">{children}</div>
      <div id="new-root"></div>
    </div>
  );
};
export default MemberLayout;
