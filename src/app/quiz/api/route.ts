import { FETCHMORENUM } from '@/constants/quizConstants';
import { serverSupabase } from '@/supabase/server';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const supabase = serverSupabase();
  const searchParams = req.nextUrl.searchParams;
  const page = Number(searchParams.get('pageParam'));

  const { data, error } = await supabase
    .from('quiz')
    .select('*')
    .order('created_at', { ascending: false })
    .range((page - 1) * FETCHMORENUM, page * FETCHMORENUM - 1);
  if (error) return new Response('fail to select quizList', { status: 500 });

  return Response.json(data);
}
