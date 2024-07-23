import { htmlTagRegex } from '@/utils/common';
import { z } from 'zod';

export const algorithmSchema = z.object({
  level: z
    .string({ required_error: '문제의 level을 입력해주세요', invalid_type_error: '' })
    .min(1, { message: '문제의 level을 입력해주세요.' }),
  title: z
    .string({ required_error: '문제의 제목을 입력해주세요', invalid_type_error: '' })
    .min(3, { message: '문제의 제목은 최소 3글자 이상이어야 합니다.' }),
  link: z
    .string()
    .url({ message: '올바른 url을 입력해주세요.' })
    .min(1, { message: '알고리즘 문제의 url을 입력해주세요' }),
  content: z.string().refine((val) => val.replace(htmlTagRegex, '').trim().length > 0, {
    message: '본인이 풀었던 코드를 입력해주세요.'
  })
});

export const userInfoSchema = z.object({
  nickname: z
    .string()
    .min(1, { message: '닉네임을 입력해주세요.' })
    .max(10, { message: '닉네임은 최대 10자까지 가능합니다.' })
    .nullable(),
  github: z
    .string()
    .url({ message: '올바른 gitjub 주소를 입력해주세요.' })
    .min(1, { message: 'gitjub 주소를 입력해주세요' })
    .nullable(),
  email: z
    .string()
    .min(1, { message: '이메일을 입력해주세요.' })
    .refine((value) => /^\S*$/.test(value), { message: '이메일에 공백을 포함할 수 없습니다.' })
    .refine((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), { message: '올바른 이메일 형식을 입력해주세요' }),
  blog: z
    .string()
    .url({ message: '올바른 blog 주소를 입력해주세요.' })
    .min(1, { message: 'blog 주소를 입력해주세요' })
    .nullable()
});

export const guestbookSchema = z.object({
  content: z
    .string()
    .min(1, { message: '방명록을 작성해주세요.' })
    .refine((val) => val.trim().length > 0, {
      message: '방명록은 공백일 수 없습니다.'
    })
});
