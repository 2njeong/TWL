import ShortBanner from '@/components/utilComponents/ShortBanner';
import { PropsWithChildren } from 'react';

const MakeQuizLayout = ({ children }: PropsWithChildren) => {
  const shortBannerProps = {
    h1Text: 'Quiz 만들기',
    pText: '주관식 / 객관식을 선택해주세요!'
  };
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <ShortBanner shortBannerProps={shortBannerProps} />
      {children}
    </div>
  );
};

export default MakeQuizLayout;
