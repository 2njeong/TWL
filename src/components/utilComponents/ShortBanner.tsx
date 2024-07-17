type ShortBannerProps = {
  h1Text: string;
  pText: string[];
};

const ShortBanner = ({ shortBannerProps }: { shortBannerProps: ShortBannerProps }) => {
  const { h1Text, pText } = shortBannerProps;

  return (
    <div className="border-y-4 border-dashed w-full h-22 px-12 py-4 flex flex-col justify-center gap-0.5">
      <h1 className="text-xl font-medium">{h1Text}</h1>
      {pText.map((p) => (
        <p key={p} className="text-gray-500">
          {p}
        </p>
      ))}
    </div>
  );
};

export default ShortBanner;
