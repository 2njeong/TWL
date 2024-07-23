import { htmlTagRegex } from '@/utils/common';
import { z } from 'zod';

export const quizSchema = z.object({
  question: z
    .string({ required_error: '질문을 입력해주세요', invalid_type_error: '' })
    .min(3, { message: '질문은 최소 3자 이상, 50자 이하여야 합니다.' })
    .max(50, { message: '질문은 최소 3자 이상, 50자 이하여야 합니다.' }),
  answer: z.preprocess(
    // 주관식 answer 유효성 검사
    (val) => (val === null ? [] : val), // 아무것도 제출하지 않았을 때, null 값을 빈 배열로 변환
    z
      .array(
        z.string().refine((val) => val.replace(htmlTagRegex, '').trim().length > 0, {
          message: '정답란에 정답을 입력해주세요.'
        })
      )
      .nonempty({
        message: '정답을 알려주세요. 도움이 필요한 질문이라도 예상하는 답변을 남겨주세요!'
      })
  ),
  candidates: z
    // 객관식 보기
    .preprocess(
      (val) => (val === null ? [] : val),
      z.array(z.string().min(1, { message: '객관식 문항을 채워주세요.' }))
    )
    .optional(),
  content: z
    .string()
    .refine((val) => val.replace(htmlTagRegex, '').trim().length > 0, { message: '문제의 내용을 알려주세요!' })
    .refine((val) => val.replace(htmlTagRegex, '').trim().length >= 5, {
      message: '문제는 최소 5자 이상이어야 합니다.'
    })
    .optional()
});
