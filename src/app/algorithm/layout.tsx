import { PropsWithChildren } from 'react';

const AlgorithmLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full max-w-[1080px] mx-auto flex flex-col gap-8">
      <header className="bg-gray-300">알고리즘 Tree</header>
      {children}
    </div>
  );
};
export default AlgorithmLayout;
