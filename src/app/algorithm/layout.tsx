import Image from 'next/image';
import { PropsWithChildren } from 'react';

const AlgorithmLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full h-[calc(100vh-12rem)]">
      <div className="border-y-4 border-dashed w-full h-20 px-12 py-4 flex flex-col justify-center gap-0.5">
        <h1 className="text-xl">알고리즘을 풀어서 트리에 장식을 달아주세요!</h1>
        <p className="text-gray-500">3일 간의 알고리즘 풀이 장식이 걸립니다.</p>
      </div>
      <div className="w-full max-w-[1080px] h-full mx-auto flex flex-col">
        <div className="w-full h-full">{children}</div>
      </div>
    </div>
  );
};
export default AlgorithmLayout;
