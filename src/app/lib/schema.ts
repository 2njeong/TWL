import { z } from 'zod';

export const testSchema = z.object({
  name: z
    .string({ required_error: 'Name is required', invalid_type_error: 'Name must be a string' })
    .min(1, { message: '최소 1글자 이상이어야 합니다.' })
    .max(5, { message: '최대 5글자 이하여야 합니다.' }),
  message: z
    .string({ required_error: 'Message is required', invalid_type_error: 'Message must be a number' })
    .min(1, { message: '최소 1글자 이상이어야 합니다.' })
    .max(10, { message: '최대 10글자 이하여야 합니다.' })
});
