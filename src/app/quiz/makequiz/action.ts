'use server';

import { serverSupabase } from '@/supabase/server';
import { revalidatePath } from 'next/cache';

const supabase = serverSupabase();

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
