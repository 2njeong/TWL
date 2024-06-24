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
  if (error) throw new Error(error.message);
  if (error) return new Response('fail to select quizList', { status: 500 });

  return Response.json(data);
}

// export const POST = async (req: Request) => {
//   const supabase = serverSupabase();
//   const { quiz_id, user_id } = await req.json();
//   const { data, error } = await supabase.rpc('append_user_id_to_quiz_like', { quiz_id, user_id });
//   if (error) throw new Error(error.message);
//   if (error) return new Response('fail to update quiz_like', { status: 500 });

//   return Response.json(data);
// };
