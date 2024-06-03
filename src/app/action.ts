'use server';

import { serverSupabase } from '@/supabase/server';
import { revalidatePath } from 'next/cache';

export const showText = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  console.log('data =>', data);
};

export const submitBtn = async (formData: FormData) => {
  const question = formData.get('question');
  const data = Object.fromEntries(formData);
  const answer = Object.values(data).slice(2);
  const supabase = serverSupabase();

  try {
    const { error } = await supabase
      .from('quiz')
      .insert({ question, answer, isSubjective: answer.length ? false : true });
    if (error) console.error(error.message);
    revalidatePath('/makequiz');
  } catch (e) {
    throw new Error('fail to add quiz');
  }
};
