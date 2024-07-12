import { Tables } from '@/type/database';

export const fetchAlgorithm = async (): Promise<
  Pick<Tables<'algorithm'>, 'algorithm_id' | 'title' | 'creator' | 'creator_avatar' | 'creator_nickname'>[]
> => {
  const response = await fetch(`/algorithm/api`);
  if (!response.ok) {
    throw new Error('That quiz response was not ok');
  }
  return response.json();
};
