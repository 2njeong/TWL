import { z } from 'zod';

export const todoSchema = z.object({
  todo_item: z
    .string({ required_error: '할 일을 입력해주세요', invalid_type_error: '' })
    .min(1, { message: '할 일은 최소 1자 이상, 30자 이하여야 합니다.' })
    .max(30, { message: '할 일은 최소 1자 이상, 30자 이하여야 합니다.' })
});
