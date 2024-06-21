import { serverSupabase } from '@/supabase/server';

const supabase = serverSupabase();

export const submitQuizLike = async ({ quiz_id, user_id }: { quiz_id: string; user_id: string }) => {
  const { data, error } = await supabase.rpc('append_user_id_to_quiz_like', { quiz_id, user_id });
};
