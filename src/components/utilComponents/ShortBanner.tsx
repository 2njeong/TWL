type ShortBannerProps = {
  h1Text: string;
  pText: string;
};

const ShortBanner = (props: { shortBannerProps: ShortBannerProps }) => {
  const { h1Text, pText } = props.shortBannerProps;

  return (
    <div className="border-y-4 border-dashed w-full h-20 px-12 py-4 flex flex-col justify-center gap-0.5">
      <h1 className="text-xl font-medium">{h1Text}</h1>
      <p className="text-gray-500">{pText}</p>
    </div>
  );
};

export default ShortBanner;
