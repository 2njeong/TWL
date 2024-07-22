import { Ball } from '@/type/algorithmType';

export const fetchAlgorithm = async (): Promise<Ball[]> => {
  const response = await fetch(`/algorithm/api`);
  if (!response.ok) {
    throw new Error('That quiz response was not ok');
  }
  return response.json();
};
