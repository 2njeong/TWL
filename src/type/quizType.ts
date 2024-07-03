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

export type MakeQuizZodErr =
  | {
      error: ZodFormattedError<
        {
          question: string;
          candidates: string[];
          content: string;
          answer: [string, ...string[]];
        },
        string
      >;
    }
  | undefined;

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

// export type MakeQuizZodErr =
//   | ZodFormattedError<
//       {
//         question: string;
//       },
//       string
//     >
//   | ZodFormattedError<
//       {
//         candidates: string[];
//       },
//       string
//     >
//   | ZodFormattedError<
//       {
//         content: string;
//       },
//       string
//     >
//   | ZodFormattedError<
//       {
//         answer: [string, ...string[]];
//       },
//       string
//     >
//   | undefined;

type ExtractErrorType<T> = T extends { error: infer E } ? E : never;

export type QuizValidationErr = ExtractErrorType<MakeQuizZodErr>;

export type QuizField = 'question' | 'candidates' | 'content' | 'answer';

// export type ZodErrorObj = {
//   [key in QuizField]: ZodFormattedError<any, string>;
// };
