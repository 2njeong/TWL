import { PropsWithChildren } from 'react';

const QuizLayout = ({ children }: PropsWithChildren) => {
  return <div className="w-full max-w-[1000px] mx-auto">{children}</div>;
};

export default QuizLayout;
