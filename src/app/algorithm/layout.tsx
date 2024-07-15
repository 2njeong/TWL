import { PropsWithChildren } from 'react';

const AlgorithmLayout = ({ children }: PropsWithChildren) => {
  return <div className="w-full h-screen max-w-[1080px] mx-auto flex flex-col">{children}</div>;
};
export default AlgorithmLayout;
