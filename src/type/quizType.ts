import { ZodFormattedError } from 'zod';
import { Database } from './database';

export type EventHandlers = {
  handleStart: (event: React.MouseEvent<Element, MouseEvent> | React.TouchEvent<Element>, idx: number) => void;
  handleMove: (event: React.MouseEvent<Element, MouseEvent> | React.TouchEvent<Element>) => void;
  handleEnd: (event: React.MouseEvent<Element, MouseEvent> | React.TouchEvent<Element>) => void;
};

export type QuizLikeList = { quiz_id: string; users: string[] };

export type QuizCommentValidationErr = ZodFormattedError<
  {
    comment_content: string;
  },
  string
>;

export type MakeQuizZodErrObj =
  | ZodFormattedError<
      {
        question?: string;
        candidates?: string[];
        content?: string;
        answer?: string[];
      },
      string
    >
  | undefined;

export type QuizField = 'question' | 'candidates' | 'content' | 'answer';

export type TopLikesQuizList = Database['public']['Functions']['get_top_quizzes_with_comment_ids']['Returns'];

type WithoutArrayType<T> = T extends (infer U)[] ? U : T;

export type TopLikesSingleQuiz = WithoutArrayType<TopLikesQuizList>;

export type HotQuizDragEventHandlers = {
  onMouseDown: (e: React.MouseEvent<Element, MouseEvent>, idx: number) => void;
  onMouseMove: (e: React.MouseEvent<Element, MouseEvent>) => void;
  onMouseUp: (e: React.MouseEvent<Element, MouseEvent>) => void;
  onTouchStart: (e: React.TouchEvent<Element>, idx: number) => void;
  onTouchMove: (e: React.TouchEvent<Element>) => void;
  onTouchEnd: (e: React.TouchEvent<Element>) => void;
};
