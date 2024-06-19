'use server';

import { serverSupabase } from '@/supabase/server';
import { revalidatePath } from 'next/cache';

const supabase = serverSupabase();

export const showText = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  console.log('data =>', data);
};

export const submitQuizAction = async (answer: null | string[], formData: FormData) => {
  const question = formData.get('question');
  const candidates = formData.getAll('candidates');
  const needHelpOrnot = formData.get('needHelp');

  try {
    const { error } = await supabase.from('quiz').insert({
      question,
      candidates,
      isSubjective: candidates.length > 1 ? false : true,
      answer: candidates.length > 1 ? answer : [candidates[0]],
      creator: null,
      needHelp: needHelpOrnot ?? false
    });
    if (error) console.error('에러 =>', error.message);
    revalidatePath('/makequiz');
  } catch (e) {
    throw new Error('fail to add quiz');
  }
};

export const submitQuizLikeAction = async (quiz_id: string) => {
  try {
    const { error } = await supabase.from('quiz_like').insert({ quiz_id });
  } catch (error) {}
};
