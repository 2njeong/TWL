import { pageAtom, totalPageAtom } from '@/atom/memberAtom';
import { useAtom } from 'jotai';

const PageNation = () => {
  const [page, setPage] = useAtom(pageAtom);
  const [totalPage] = useAtom(totalPageAtom);

  const handlePlusPage = (pageNum: number) => {
    setPage(pageNum);
  };

  return (
    <div className="w-full flex items-center justify-center gap-4">
      {Array.from({ length: totalPage })
        .map((_, idx) => idx + 1)
        .map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => handlePlusPage(pageNum)}
            className={`${pageNum === page && 'text-lg font-bold'} ${pageNum === totalPage && 'text-gray-500'}`}
          >
            {pageNum}
          </button>
        ))}
    </div>
  );
};

export default PageNation;
