import { PropsWithChildren } from 'react';

const QuizLayout = ({ children }: PropsWithChildren) => {
  return <div className="w-full h-full">{children}</div>;
};

export default QuizLayout;
