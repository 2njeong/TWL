import { z } from 'zod';

const htmlTagRegex = /<[^>]*>/g;

export const algorithmSchema = z.object({
  level: z
    .string({ required_error: '문제의 level을 입력해주세요', invalid_type_error: '' })
    .min(1, { message: '문제의 level을 입력해주세요.' }),
  title: z
    .string({ required_error: '문제의 제목을 입력해주세요', invalid_type_error: '' })
    .min(3, { message: '문제의 제목은 최소 3글자 이상이어야 합니다.' }),
  link: z.string().url().min(1, { message: '알고리즘 문제의 url을 입력해주세요' }),
  content: z.string().refine((val) => val.replace(htmlTagRegex, '').trim().length > 0, {
    message: '본인이 풀었던 코드를 입력해주세요.'
  })
});
