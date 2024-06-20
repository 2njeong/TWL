import { PropsWithChildren } from 'react';

const MakeQuizLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full max-w-[1080px] mx-auto flex flex-col gap-8">
      <header className="bg-gray-300">Quiz 만들기</header>
      {children}
    </div>
  );
};

export default MakeQuizLayout;
