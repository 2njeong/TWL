import Image from 'next/image';

const AvatarImage = ({ url, alt }: { url: string; alt: string }) => {
  return (
    <div className="relative w-52 h-52 rounded-full">
      <Image
        src={url}
        alt={alt}
        fill={true}
        className="rounded-full object-cover"
        sizes="500px"
        priority={true}
        blurDataURL="/loading_img.gif"
        placeholder="blur"
      />
    </div>
  );
};

export default AvatarImage;
