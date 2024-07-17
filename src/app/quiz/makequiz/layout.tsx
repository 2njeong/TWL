import { PropsWithChildren } from 'react';

const MakeQuizLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full h-full">
      <header className="bg-gray-300">Quiz 만들기</header>
      {children}
    </div>
  );
};

export default MakeQuizLayout;
