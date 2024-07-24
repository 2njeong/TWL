'use client';

import { Tables } from '@/type/database';
import SingleAlgorithm from './SingleAlgorithm';

const AlgorithmList = ({ algorithmData }: { algorithmData: Tables<'algorithm'>[] | undefined }) => {
  return (
    <div className="p-2 grid grid-cols-2 max-sm:grid-cols-1 gap-x-6 gap-y-8">
      {algorithmData?.map((item) => (
        <div key={item.algorithm_id}>
          <SingleAlgorithm item={item} />
        </div>
      ))}
    </div>
  );
};

export default AlgorithmList;
