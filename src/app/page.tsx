import IntroSlide from '@/components/mainPage/IntroSlide';
import Image from 'next/image';

const Home = () => {
  return (
    <div className="flex gap-4 w-full h-[calc(100vh-5rem)] max-sm:flex-col">
      <div className="h-full w-[25rem] relative">
        <Image
          src="/mainTree.jpg"
          alt="메인트리 이미지"
          fill={true}
          className="object-cover"
          sizes="700px"
          priority={true}
          blurDataURL="/loading_img.gif"
          placeholder="blur"
        />
      </div>
      <IntroSlide />
    </div>
  );
};

export default Home;
