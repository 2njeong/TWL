import { z } from 'zod';

export const authSchema = z.object({
  email: z
    .string()
    .min(1, { message: '이메일을 입력해주세요.' }) // 입력이 비어 있는지 확인
    .refine((value) => /^\S*$/.test(value), { message: '이메일에 공백을 포함할 수 없습니다.' }) // 공백이 없는지 확인
    .refine((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), { message: '올바른 이메일 형식을 입력해주세요' }),
  nickname: z
    .string()
    .min(1, { message: '닉네임을 입력해주세요.' })
    .max(10, { message: '닉네임은 최대 10자까지 가능합니다.' })
    .optional(),
  password: z
    .string()
    .min(1, { message: '비밀번호를 입력해주세요.' })
    .regex(/^\S*$/, '공백을 포함할 수 없습니다.')
    .regex(/[A-Z]/, '비밀번호에는 최소 하나의 대문자가 포함되어야 합니다.')
    .regex(/[a-z]/, '비밀번호에는 최소 하나의 소문자가 포함되어야 합니다.')
    .regex(/\d/, '비밀번호에는 최소 하나의 숫자가 포함되어야 합니다.')
    .regex(/[\W_]/, '비밀번호에는 최소 하나의 특수문자가 포함되어야 합니다.')
});
