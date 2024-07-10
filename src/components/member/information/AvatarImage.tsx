import Image from 'next/image';

const AvatarImage = ({ src, alt, size }: { src: string; alt: string; size: string }) => {
  return (
    <div className={`relative w-${size} h-${size} rounded-full`}>
      <Image
        src={src}
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
