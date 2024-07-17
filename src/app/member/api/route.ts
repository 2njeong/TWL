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
    case 'thatUsersQuizList': {
      const page = Number(searchParams.get('pageParam'));
      const thatUser = searchParams.get('thatUser');
      const { data, error } = await supabase
        .from('quiz')
        .select('*, quiz_like(users), comments(comment_id)')
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
        .order('created_at', { ascending: false })
        .range((page - 1) * NUM_OF_FETCHMOREALGORITHM, page * NUM_OF_FETCHMOREALGORITHM - 1);
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

      console.log('data =>', data.length);
      if (error) {
        throw new Error(error.message);
      }
      return Response.json(data);
    }
    default:
      return new Response('Invalid type', { status: 400 });
  }
};
