import { Tables } from '@/type/database';

export const fetchCurrentUser = async (): Promise<Tables<'users'>> => {
  const response = await fetch('/auth/api');
  if (!response.ok) {
    throw new Error('UserData response was not ok');
  }
  return response.json();
};
