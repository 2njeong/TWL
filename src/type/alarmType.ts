import { Tables } from './database';

type AlarmComment = Omit<Tables<'comments'>, 'quiz_id' | 'isDeleted' | 'read'> & { creator_nickname: string };

export type QuizCommentsAlarm = {
  quiz_id: string;
  question: string;
  comments: AlarmComment;
};
