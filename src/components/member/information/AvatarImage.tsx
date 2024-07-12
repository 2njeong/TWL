import Image from 'next/image';

const AvatarImage = ({
  src,
  alt,
  size,
  className
}: {
  src: string | null;
  alt: string;
  size: string;
  className?: string;
}) => {
  return (
    <div
      className="relative rounded-full flex justify-center items-center"
      style={{ width: `${size}rem`, height: `${size}rem` }}
    >
      <Image
        src={src ?? '/basic_avatar.png'}
        alt={alt}
        fill={true}
        className={`${className && className} rounded-full object-cover`}
        sizes="500px"
        priority={true}
        blurDataURL="/loading_img.gif"
        placeholder="blur"
      />
    </div>
  );
};

export default AvatarImage;
