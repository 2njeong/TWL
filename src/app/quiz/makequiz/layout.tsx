import ShortBanner from '@/components/utilComponents/ShortBanner';
import { PropsWithChildren } from 'react';

const MakeQuizLayout = ({ children }: PropsWithChildren) => {
  const shortBannerProps = {
    h1Text: 'Quiz 만들기',
    pText: ['주관식 또는 객관식을 선택하고, 문제와 정답을 기재하여 제출해주세요!']
  };
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <ShortBanner shortBannerProps={shortBannerProps} />
      {children}
    </div>
  );
};

export default MakeQuizLayout;
