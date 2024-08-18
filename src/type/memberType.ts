import { Tables } from './database';

export type UserInfoOBJ = {
  avatar: string | undefined;
  user_id: string | undefined;
  nickname: string | null;
  github: string | null;
  email: string | null;
  blog: string | null;
  allowshow: boolean;
};

export type GuestBookObj = {
  creator: string | undefined;
  allowShow: boolean;
};

export type QuizListOfThatUser = Tables<'quiz'> & {
  quiz_like: { users: string[] };
  comments: { isDeleted: boolean; comment_id: string }[];
};

export type ExtendedGuestBook = Tables<'guestbook'> & { avatar: string | null; nickname: string };

export type Todolist = { day: string; todos: Tables<'todolist'>[] };
