import { PropsWithChildren } from 'react';

const QuizLayout = ({ children }: PropsWithChildren) => {
  return <div className="w-full h-[calc(100vh-5rem)]">{children}</div>;
};

export default QuizLayout;
