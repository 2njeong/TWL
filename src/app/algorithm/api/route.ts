import { DAY_OF_FETCH_ALGORITHM, NUM_OF_FETCH_ALGORITHM } from '@/constants/algorithmConstants';
import { serverSupabase } from '@/supabase/server';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const supabase = serverSupabase();

  const { data, error } = await supabase.rpc('get_recent_algorithms_with_user', {
    p_days_ago: `${DAY_OF_FETCH_ALGORITHM} days`,
    p_limit: NUM_OF_FETCH_ALGORITHM
  });

  if (error) return new Response('fail to select algorithm', { status: 500 });
  return Response.json(data);
}
