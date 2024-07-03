'use server';

import { quizSchema } from '@/schema/makeQuizSchema';
import { serverSupabase } from '@/supabase/server';

const supabase = serverSupabase();

export const submitQuizAction = async (
  answer: string[] | null,
  content: string | null,
  user_id: string,
  quizType: string,
  formData: FormData
) => {
  const question = formData.get('question');
  const candidates = formData.getAll('candidates');
  const needHelpOrnot = formData.get('needHelp');

  const { error: quizZodErr } = quizSchema.safeParse({ question, answer, candidates, content });
  if (quizZodErr) return { error: quizZodErr.format() };

  // const { error: questionZodErr } = questionSchema.safeParse({ question, answer });
  // if (questionZodErr) {
  //   // console.log('quizZodErr =>', questionZodErr);
  //   // console.log('quizZodErr.format() =>', questionZodErr.format());
  //   return { error: questionZodErr.format() };
  // }

  // if (quizType === '객관식') {
  //   const { error: zodErr } = multipleSchema.safeParse({ candidates });
  //   if (zodErr) return { error: zodErr.format() };
  // } else {
  //   const { error: zodErr } = subjectiveSchema.safeParse({ content });
  //   if (zodErr) return { error: zodErr.format() };
  // }

  // const { error: answerZodErr } = answerSchema.safeParse({ answer });
  // if (answerZodErr) return { error: answerZodErr.format() };

  // try {
  //   const { error } = await supabase.from('quiz').insert({
  //     question,
  //     candidates,
  //     content,
  //     isSubjective: content ? true : false,
  //     answer,
  //     creator: user_id,
  //     needHelp: needHelpOrnot ?? false
  //   });
  //   if (error) throw new Error(error.message);
  // } catch (e) {
  //   throw new Error(`fail to add quiz, ${e}`);
  // }
};
