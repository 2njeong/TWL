import { clientSupabase } from '@/supabase/client';

export const fetchCurrentUser = async () => {
  const supabase = clientSupabase();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (user) {
    const { data: userData, error } = await supabase.from('users').select('*').eq('user_id', user.id).single();
    if (error) throw new Error(error.message);
    return userData;
  }
  return null;
};
