import { serverSupabase } from '@/supabase/server';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const type = searchParams.get('type');
  const supabase = serverSupabase();
  switch (type) {
    case 'thatUsersAlgorithm': {
      const thatUser = searchParams.get('thatUser');
      const { data, error } = await supabase.from('algorithm').select('*').eq('user_id', thatUser);
      if (error) {
        throw new Error(error.message);
      }
      return Response.json(data);
    }

    default:
      return new Response('Invalid type', { status: 400 });
  }
};
