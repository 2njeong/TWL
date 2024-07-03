import { z } from 'zod';

const htmlTagRegex = /<[^>]*>/g;
// HTML 태그를 포함하는지 확인하는 정규식

const stringWithoutHtmlTags = (message: string) => {
  return z.string().refine(
    // false면 message 반환
    (val) => {
      return !htmlTagRegex.test(val);
    },
    {
      message
    }
  );
};

export const quizSchema = z.object({
  question: z
    .string({ required_error: '질문을 입력해주세요', invalid_type_error: '' })
    .min(3, { message: '질문은 최소 3자 이상이어야 합니다.' })
    .max(30, { message: '질문은 최대 50자까지 가능합니다.' }),
  answer: z.preprocess(
    (val) => (val === null ? [] : val), // null 값을 빈 배열로 변환
    z.array(stringWithoutHtmlTags('답변을 입력해주세요!')).nonempty({
      message: '정답을 알려주세요. 도움이 필요한 질문이라도 예상하는 답변을 남겨주세요!'
    })
  ),
  candidates: z.preprocess(
    (val) => (val === null ? [] : val),
    z
      .array(z.string().min(1, { message: '객관식 문항을 채워주세요.' }))
      .min(2, { message: '객관식 문항은 최소 2개 이상이어야 합니다.' })
      .max(5, { message: '객관식 문항은 최대 5개까지 가능합니다.' })
  ),
  content: stringWithoutHtmlTags('문제의 내용을 입력해주세요.')
  // .min(5, { message: '문제는 최소 5자 이상이어야 합니다.' })
});
