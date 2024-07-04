'use server';

import { quizSchema } from '@/schema/makeQuizSchema';
import { serverSupabase } from '@/supabase/server';

const supabase = serverSupabase();

export const submitQuizAction = async (
  answer: string[] | null,
  content: string | null,
  quizType: string,
  user_id: string,
  formData: FormData
) => {
  const question = formData.get('question');
  const candidates = formData.getAll('candidates');
  const needHelpOrnot = formData.get('needHelp');

  const { error: quizZodErr } =
    quizType === '객관식'
      ? quizSchema.safeParse({ question, answer, candidates })
      : quizSchema.safeParse({ question, answer, content });
  if (quizZodErr) return { error: quizZodErr.format() };

  try {
    const { error } = await supabase.from('quiz').insert({
      question,
      candidates,
      content,
      isSubjective: content ? true : false,
      answer,
      creator: user_id,
      needHelp: needHelpOrnot ?? false
    });
    if (error) throw new Error(error.message);
  } catch (e) {
    throw new Error(`fail to add quiz, ${e}`);
  }
};
