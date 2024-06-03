'use server';

import { serverSupabase } from '@/supabase/server';
import { revalidatePath } from 'next/cache';

export const showText = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  console.log('data =>', data);
};

export const submitAction = async (answer: null | string[], formData: FormData) => {
  const question = formData.get('question');
  const candidates = formData.getAll('candidates');
  console.log('보기리스트 =>', formData.getAll('candidates'));
  console.log('answer =>', answer);

  const supabase = serverSupabase();

  try {
    const { error } = await supabase.from('quiz').insert({
      question,
      candidates,
      isSubjective: candidates.length > 1 ? false : true,
      answer: candidates.length > 1 ? answer : [candidates[0]]
    });
    if (error) console.error('에러 =>', error.message);
    revalidatePath('/makequiz');
  } catch (e) {
    throw new Error('fail to add quiz');
  }
};
