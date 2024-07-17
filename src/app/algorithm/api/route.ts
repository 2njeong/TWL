import { DAY_OF_FETCH_ALGORITHM } from '@/constants/algorithmConstants';
import { serverSupabase } from '@/supabase/server';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const supabase = serverSupabase();

  const currentDate = new Date();

  const threeDaysAgo = new Date(currentDate);
  threeDaysAgo.setDate(currentDate.getDate() - DAY_OF_FETCH_ALGORITHM);
  const threeDaysAgoISOString = threeDaysAgo.toISOString();

  const { data, error } = await supabase
    .from('algorithm')
    .select('algorithm_id, title, creator, creator_nickname, creator_avatar')
    .gte('created_at', threeDaysAgoISOString)
    .order('created_at', { ascending: false })
    .range(0, 9);

  if (error) return new Response('fail to select algorithm', { status: 500 });
  return Response.json(data);
}
