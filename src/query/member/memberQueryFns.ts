import { Tables } from '@/type/database';

export const fetchThatUsersAlgorithm = async (thatUser: string | undefined): Promise<Tables<'algorithm'>[]> => {
  const response = await fetch(`/member/api?type=thatUsersAlgorithm&thatUser=${thatUser}`);
  if (!response.ok) {
    throw new Error('ThatUser_s algorithm response was not ok');
  }
  return response.json();
};

export const fetchThatUsersGuestbook = async (
  thatUser: string | undefined,
  page = 1
): Promise<Tables<'guestbook'>[]> => {
  const response = await fetch(`/member/api?type=guestbook&thatUser=${thatUser}&page=${page}`);
  if (!response.ok) {
    throw new Error('ThatUser_s guestbook response was not ok');
  }
  return response.json();
};
