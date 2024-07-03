import { ZodFormattedError } from 'zod';

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

export type ZodErrObj =
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
