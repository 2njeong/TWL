import { serverSupabase } from '@/supabase/server';
import { Tables } from '@/type/database';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const type = searchParams.get('type');
  const supabase = serverSupabase();

  switch (type) {
    case 'currentUser': {
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase.from('users').select('*').eq('user_id', user.id).single();
        if (error) {
          console.log('currentUser Error =>', error);
          throw new Error(error.message);
        }
        const userData = data as Tables<'users'>;
        return Response.json(userData);
      } else {
        return Response.json({ error: 'User not found' }, { status: 404 });
      }
    }
    case 'quizCreator': {
      const creator = searchParams.get('creator');
      const { data, error } = await supabase.from('users').select('*').eq('user_id', creator);
      if (error) {
        console.log('quizCreator error =>', error.message);
        throw new Error(error.message);
      }
      return Response.json(data);
    }
    case 'thatUser': {
      const thatUser = searchParams.get('thatUser');
      const { data, error } = await supabase.from('users').select('*').eq('user_id', thatUser);
      if (error) {
        console.log('thatUser error =>', error);
        throw new Error(error.message);
      }
      return Response.json(data);
    }
    default:
      return new Response('Invalid type', { status: 400 });
  }

  // if (type === 'currentUser') {

  // } else if (type === 'quizCreator') {
  //   const creator = searchParams.get('creator');
  //   const { data, error } = await supabase.from('users').select('*').eq('user_id', creator).single();
  //   console.log('route.ts data =>', data);
  //   if (error) {
  //     console.log('error =>', error);
  //     throw new Error(error.message);
  //   }
  //   return Response.json(data);
  // }
}
