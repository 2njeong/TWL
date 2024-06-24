import { serverSupabase } from '@/supabase/server';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const supabase = serverSupabase();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (user) {
    const { data: userData, error } = await supabase.from('users').select('*').eq('user_id', user.id).single();
    if (error) {
      throw new Error(error.message);
    }
    return Response.json(userData);
  }
  return null;
}
