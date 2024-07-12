import { Tables } from '@/type/database';
import { QuizListOfThatUser } from '@/type/memberType';

export const fetchThatUsersQuizList = async ({
  pageParam = 1,
  thatUser
}: {
  pageParam: number;
  thatUser: string | undefined;
}): Promise<QuizListOfThatUser[]> => {
  const response = await fetch(`/member/api?type=thatUsersQuizList&thatUser=${thatUser}&pageParam=${pageParam}`);
  if (!response.ok) {
    throw new Error('ThatUser_s quizList response was not ok');
  }
  return response.json();
};

export const fetchThatUsersAlgorithm = async ({
  pageParam = 1,
  thatUser
}: {
  pageParam: number;
  thatUser: string | undefined;
}): Promise<Tables<'algorithm'>[]> => {
  const response = await fetch(`/member/api?type=thatUsersAlgorithm&thatUser=${thatUser}&pageParam=${pageParam}`);
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
