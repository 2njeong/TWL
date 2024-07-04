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
    // console.log('user =>', user);
    if (user) {
      const { data, error } = await supabase.from('users').select('*').eq('user_id', user.id).single();
      if (error) {
        // console.log('currentUser Error =>', error);
        throw new Error(error.message);
      }
      const userData = data as Tables<'users'>;
      return Response.json(userData);
    } else {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }
  } else if (type === 'quizCreator') {
    const creator = searchParams.get('creator');
    const { data, error } = await supabase.from('users').select('*').eq('user_id', creator).single();
    console.log('route.ts data =>', data);
    if (error) {
      console.log('error =>', error);
      throw new Error(error.message);
    }
    return Response.json(data);
  }
}
