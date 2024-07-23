import Image from 'next/image';

const Home = () => {
  const main1PictureArr = [
    { text: '주관식, 객관식 원하는 유형의 문제를 제출해보세요.', img: '/main4.png' },
    { text: '다른 스터디원의 문제를 풀고 댓글을 달아보세요.', img: '/main3.png' }
  ];
  const main2PictureArr = [
    { text: '문제와 알고리즘 풀이를 공유해요!', img: '/main1.png' },
    { text: '미니홈피에서 todolist를 공유하고 방명록을 남길 수 있어요.', img: '/main2.png' }
  ];
  return (
    <div className="flex gap-4 w-full h-[calc(100vh-5rem)]">
      <div className="h-full w-1/3 relative">
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
      <div className="h-full w-[40%] flex flex-col gap-2">
        {main1PictureArr.map((picture) => (
          <div key={picture.img} className="relative h-1/2 w-full flex flex-col gap-2">
            <h2 className="font-semibold text-gray-500">{picture.text}</h2>
            <Image
              src={picture.img}
              alt="메인 이미지1"
              fill={true}
              className="object-contain"
              sizes="500px"
              priority={true}
              blurDataURL="/loading_img.gif"
              placeholder="blur"
            />
          </div>
        ))}
      </div>
      <div className="h-full w-[40%] flex flex-col gap-2">
        {main2PictureArr.map((picture) => (
          <div key={picture.img} className="relative h-1/2 w-full flex flex-col gap-2">
            <h2 className="font-semibold text-gray-500">{picture.text}</h2>
            <Image
              src={picture.img}
              alt="메인 이미지1"
              fill={true}
              className="object-contain"
              sizes="500px"
              priority={true}
              blurDataURL="/loading_img.gif"
              placeholder="blur"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
