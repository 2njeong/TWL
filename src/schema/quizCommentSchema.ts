import { z } from 'zod';

export const quizCommentSchema = z.object({
  comment_content: z
    .string({ required_error: '댓글을 입력해주세요.', invalid_type_error: '' })
    .min(5, { message: '댓글은 최소 5자 이상이어야 합니다.' })
    .max(200, { message: '댓글은 최대 30자까지 가능합니다.' })
});
