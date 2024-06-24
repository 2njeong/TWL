'use server';

import { serverSupabase } from '@/supabase/server';

const supabase = serverSupabase();

export const submitQuizLike = async (quiz_id: string | undefined, user_id: string) => {
  const { error } = await supabase.rpc('user_id_to_quiz_like', { quiz_id, user_id });
  if (error) throw new Error(error.message);
};
