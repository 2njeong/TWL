import { useQuery } from '@tanstack/react-query';
import { ALGORITHM_QUERY_KEY } from '../algorithm/algorithmQueryKey';
import { fetchAlgorithm } from '../algorithm/algoruthmQueryFn';
import { Ball } from '@/type/algorithmType';

export const useFetchAlgorithm = () => {
  const { data, isLoading } = useQuery<Ball[]>({
    queryKey: [ALGORITHM_QUERY_KEY],
    queryFn: fetchAlgorithm
  });
  return { data, isLoading };
};
