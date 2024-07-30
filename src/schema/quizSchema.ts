import { htmlTagRegex } from '@/utils/common';
import { z } from 'zod';

export const updateSchema = z.object({
  answer: z.preprocess(
    // 주관식 answer 유효성 검사
    (val) => (val === null ? [] : val), // 아무것도 제출하지 않았을 때, null 값을 빈 배열로 변환
    z
      .array(
        z.string().refine((val) => val.replace(htmlTagRegex, '').trim().length > 0, {
          message: '수정할 내용을 입력해주세요.'
        })
      )
      .nonempty({
        message: '수정할 내용은 빈 칸일 수 없습니다'
      })
  )
});

export const quizCommentSchema = z.object({
  comment_content: z
    .string({ required_error: '댓글을 입력해주세요.', invalid_type_error: '' })
    .min(5, { message: '댓글은 최소 5자 이상이어야 합니다.' })
    .max(200, { message: '댓글은 최대 30자까지 가능합니다.' })
});
