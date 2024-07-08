'use server';

import { serverSupabase } from '@/supabase/server';

const supabase = serverSupabase();

export const submitAlgorithm = async (user_id: string, content: string, data: FormData) => {
  const level = data.get('level');
  const title = data.get('title');
  const newLearn = data.get('newLearn');
  const algorithmObj = { user_id, level, title, content, newLearn };
  try {
    const { error } = await supabase.from('algorithm').insert(algorithmObj);
    if (error) throw new Error(error.message);
  } catch (e) {
    throw new Error(`fail to add new algorithm, ${e}`);
  }
};
