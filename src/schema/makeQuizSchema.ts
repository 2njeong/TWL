import { z } from 'zod';

export const multipleSchema = z.object({
  Question: z
    .string({ required_error: '질문을 입력해주세요', invalid_type_error: '' })
    .min(5, { message: '질문은 최소 5자 이상이어야 합니다.' })
    .max(30, { message: '질문은 최대 30자까지 가능합니다.' }),
  select: z
    .string({ required_error: '보기를 입력해주세요', invalid_type_error: '' })
    .min(1, { message: '보기는 최소 한 글자 이상이어야 합니다.' })
    .max(20, { message: '보기는 최대 20자까지 가능합니다.' })
});

export const subjectiveSchema = z.object({
  Question: z
    .string({ required_error: '질문을 입력해주세요', invalid_type_error: '' })
    .min(5, { message: '질문은 최소 5자 이상이어야 합니다.' })
    .max(30, { message: '질문은 최대 30자까지 가능합니다.' }),
  answer: z
    .string({ required_error: '답을 입력해주세요', invalid_type_error: '' })
    .min(1, { message: '답은 최소 한 글자 이상이어야 합니다.' })
    .max(20, { message: '보기는 최대 20자까지 가능합니다.' })
});
