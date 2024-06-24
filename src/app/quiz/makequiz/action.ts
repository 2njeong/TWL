'use server';

import { serverSupabase } from '@/supabase/server';

const supabase = serverSupabase();

export const submitQuizAction = async (answer: null | string[], user_id: string, formData: FormData) => {
  const question = formData.get('question');
  const candidates = formData.getAll('candidates');
  const needHelpOrnot = formData.get('needHelp');

  try {
    const { error } = await supabase.from('quiz').insert({
      question,
      candidates,
      isSubjective: candidates.length > 1 ? false : true,
      answer: candidates.length > 1 ? answer : [candidates[0]],
      creator: user_id,
      needHelp: needHelpOrnot ?? false
    });
    if (error) throw new Error(error.message);
  } catch (e) {
    throw new Error('fail to add quiz');
  }
};
