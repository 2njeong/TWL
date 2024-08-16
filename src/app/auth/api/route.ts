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
        throw new Error(error.message);
      }
      return Response.json(data);
    }
    case 'thatUser': {
      const thatUser = searchParams.get('thatUser');
      const { data, error } = await supabase.from('users').select('*').eq('user_id', thatUser);
      if (error) {
        throw new Error(error.message);
      }
      return Response.json(data);
    }
    case 'quizCommentsAlarm': {
      const currentUserId = searchParams.get('currentUserId');
      const { data, error } = await supabase.rpc('get_unread_comments_by_quiz', { currentuserid: currentUserId });
      if (error) {
        throw new Error(error.message);
      }
      return Response.json(data);
    }
    case 'allUsers': {
      const { data, error } = await supabase.from('users').select('*');
      if (error) {
        throw new Error(error.message);
      }
      return Response.json(data);
    }

    default:
      return new Response('Invalid type', { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  const supabase = serverSupabase();

  const { p_comment_id } = await req.json();

  const { data, error } = await supabase.rpc('mark_comment_as_read', {
    p_comment_id
  });

  if (error) {
    console.error('Error marking comment as read:', error);
    throw new Error(error.message);
  }

  if (!data) {
    console.error('Data returned is null');
  }

  return Response.json({ comment_id: data });
}
