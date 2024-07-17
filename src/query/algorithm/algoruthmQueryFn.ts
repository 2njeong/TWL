import { Tables } from '@/type/database';
import { Ball } from '@/type/memberType';

export const fetchAlgorithm = async (): Promise<Ball[]> => {
  const response = await fetch(`/algorithm/api`);
  if (!response.ok) {
    throw new Error('That quiz response was not ok');
  }
  return response.json();
};
