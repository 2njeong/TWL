'use server';

import { algorithmSchema } from '@/schema/memberSchema';
import { serverSupabase } from '@/supabase/server';

const supabase = serverSupabase();

export const submitAlgorithm = async (user_id: string, content: string, data: FormData) => {
  const level = data.get('level');
  const title = data.get('title');
  const link = data.get('link');
  const newLearn = data.get('newLearn');
  const algorithmObj = { user_id, level, title, link, content, newLearn };

  const result = algorithmSchema.safeParse({ level, title, link, content });
  if (!result.success) {
    const errors = result.error.errors;
    return errors[0];
  }

  try {
    const { error } = await supabase.from('algorithm').insert(algorithmObj);
    if (error) throw new Error(error.message);
  } catch (e) {
    throw new Error(`fail to add new algorithm, ${e}`);
  }
};
