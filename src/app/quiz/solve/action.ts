'use server';

import { serverSupabase } from '@/supabase/server';

const supabase = serverSupabase();

export const submitQuizLike = async (quiz_id: string | undefined, user_id: string) => {
  const { error } = await supabase.rpc('user_id_to_quiz_like', { quiz_id, user_id });
  if (error) throw new Error(error.message);
};

export const handleQuizComment = async (
  comment_creator: string | undefined,
  quiz_id: string | undefined,
  data: FormData
) => {
  const comment_content = data.get('comment_content');
  const quizCommnetObj = { comment_creator, quiz_id, comment_content };

  try {
    const { error } = await supabase.from('comments').insert(quizCommnetObj);
    if (error) throw new Error(error);
  } catch (e) {
    throw new Error(`fail to insert quiz comment, ${e}`);
  }
};
