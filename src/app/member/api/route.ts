import {
  NUM_OF_FETCHMOREALGORITHM,
  NUM_OF_FETCHMOREGUESTBOOK,
  NUM_OF_FETCHMOREQUIZLISTOFTHATUSER
} from '@/constants/memberConstants';
import { serverSupabase } from '@/supabase/server';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const type = searchParams.get('type');
  const supabase = serverSupabase();
  switch (type) {
    case 'guestbookAlarm': {
      const currentUserId = searchParams.get('currentUserId');
      const { data, error } = await supabase.rpc('get_unread_guestbook', { current_user_id: currentUserId });
      if (error) {
        throw new Error(error.message);
      }
      return Response.json(data);
    }
    case 'thatUsersQuizList': {
      const page = Number(searchParams.get('pageParam'));
      const thatUser = searchParams.get('thatUser');
      const { data, error } = await supabase
        .from('quiz')
        .select('*, quiz_like(users), comments(comment_id, isDeleted)')
        .eq('creator', thatUser)
        .order('created_at', { ascending: false })
        .range((page - 1) * NUM_OF_FETCHMOREQUIZLISTOFTHATUSER, page * NUM_OF_FETCHMOREQUIZLISTOFTHATUSER - 1);
      if (error) {
        throw new Error(error.message);
      }
      return Response.json(data);
    }
    case 'thatUsersAlgorithm': {
      const page = Number(searchParams.get('pageParam'));
      const thatUser = searchParams.get('thatUser');
      const { data, error } = await supabase
        .from('algorithm')
        .select('*')
        .eq('creator', thatUser)
        .eq('isDeleted', false)
        .order('created_at', { ascending: false })
        .range((page - 1) * NUM_OF_FETCHMOREALGORITHM, page * NUM_OF_FETCHMOREALGORITHM - 1);
      if (error) {
        throw new Error(error.message);
      }
      return Response.json(data);
    }
    case 'todolist': {
      const thatUser = searchParams.get('thatUser');
      const { data, error } = await supabase.rpc('get_7days_todolist', {
        kst_date: new Date().toISOString(),
        p_user_id: thatUser
      });
      if (error) {
        throw new Error(error.message);
      }
      return Response.json(data);
    }
    case 'fetchMoretodolist': {
      const last_day = searchParams.get('day');
      const user_id = searchParams.get('user_id');
      const { data, error } = await supabase.rpc('get_more_todolist', { last_day, input_user_id: user_id });
      if (error) {
        throw new Error(error.message);
      }
      return Response.json(data);
    }
    case 'guestbook': {
      const thatUser = searchParams.get('thatUser');
      const page = Number(searchParams.get('page'));
      const { data, error } = await supabase.rpc('get_guestbook', {
        that_user: thatUser,
        is_deleted: false,
        offset_value: (page - 1) * NUM_OF_FETCHMOREGUESTBOOK,
        limit_value: NUM_OF_FETCHMOREGUESTBOOK + 1
      });
      if (error) {
        throw new Error(error.message);
      }
      return Response.json(data);
    }
    default:
      return new Response('Invalid type', { status: 400 });
  }
};

export async function POST(req: NextRequest) {
  const supabase = serverSupabase();
  const { guestbook_id } = await req.json();
  const { data, error } = await supabase.from('guestbook').update({ read: true }).eq('guestbook_id', guestbook_id);

  if (error) {
    console.error('Error marking comment as read:', error);
    throw new Error(error.message);
  }
  if (!data) {
    console.error('Data returned is null');
  }
  return Response.json({ comment_id: data });
}
