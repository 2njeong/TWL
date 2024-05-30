import { ZodFormattedError } from 'zod';

export type InputFormData = {
  [k: string]: FormDataEntryValue;
};

export type ValidationErr = ZodFormattedError<
  {
    name: string;
    message: string;
  },
  string
>;
