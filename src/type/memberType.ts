import { Tables } from './database';

export type UserInfoOBJ = {
  avatar: string | undefined;
  user_id: string | undefined;
  nickname: string | null;
  github: string | null;
  email: string | null;
  allowshow: boolean;
};

export type GuestBookObj = {
  creator: string | undefined;
  allowShow: boolean;
};

export type QuizListOfThatUser = Tables<'quiz'> & {
  quiz_like: { users: string[] };
  comments: string[];
};

export type Ball = Pick<
  Tables<'algorithm'>,
  'algorithm_id' | 'title' | 'creator' | 'creator_avatar' | 'creator_nickname'
>;

export type ExtendedGuestBook = Tables<'guestbook'> & { avatar: string | null };
