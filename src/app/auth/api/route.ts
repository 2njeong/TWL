import { serverSupabase } from '@/supabase/server';
import { UserData } from '@/type/authType';

export async function GET() {
  const supabase = serverSupabase();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (user) {
    const { data, error } = await supabase.from('users').select('*').eq('user_id', user.id).single();
    if (error) {
      throw new Error(error.message);
    }
    const userData = data as UserData;
    return Response.json(userData);
  }
}
