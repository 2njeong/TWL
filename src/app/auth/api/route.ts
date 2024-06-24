import { serverSupabase } from '@/supabase/server';
import { Tables } from '@/type/database';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const type = searchParams.get('type');
  const supabase = serverSupabase();

  if (type === 'currentUser') {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (user) {
      const { data, error } = await supabase.from('users').select('*').eq('user_id', user.id).single();
      if (error) {
        throw new Error(error.message);
      }
      const userData = data as Tables<'users'>;
      return Response.json(userData);
    }
  } else if (type === 'quizCreator') {
    const creator = searchParams.get('creator');
    const { data, error } = await supabase.from('users').select('*').eq('user_id', creator).single();
    if (error) {
      throw new Error(error.message);
    }
    return Response.json(data);
  }
}
