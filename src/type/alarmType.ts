import { Tables } from './database';

type AlarmComment = Omit<Tables<'comments'>, 'quiz_id' | 'isDeleted' | 'read'> & {
  creator_nickname: string;
  selected_due_to: string;
};

export type QuizCommentsAlarm = {
  quiz_id: string;
  question: string;
  comments: AlarmComment;
};
