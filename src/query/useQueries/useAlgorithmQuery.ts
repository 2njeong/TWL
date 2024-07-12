import { useQuery } from '@tanstack/react-query';
import { ALGORITHM_QUERY_KEY } from '../algorithm/algorithmQueryKey';
import { fetchAlgorithm } from '../algorithm/algoruthmQueryFn';
import { Tables } from '@/type/database';

export const useFetchAlgorithm = () => {
  const { data, isLoading } = useQuery<
    Pick<Tables<'algorithm'>, 'algorithm_id' | 'title' | 'creator' | 'creator_avatar' | 'creator_nickname'>[]
  >({
    queryKey: [ALGORITHM_QUERY_KEY],
    queryFn: fetchAlgorithm
  });
  return { data, isLoading };
};
