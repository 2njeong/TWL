import { FETCHMORECOMMENTSNUM, NUMOFFETCHMOREQUIZ, TOPLIKESQUIZZES } from '@/constants/quizConstants';
import { serverSupabase } from '@/supabase/server';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const supabase = serverSupabase();
  const searchParams = req.nextUrl.searchParams;
  const type = searchParams.get('type');

  switch (type) {
    case 'list': {
      const page = Number(searchParams.get('pageParam'));
      const { data, error } = await supabase
        .from('quiz')
        .select('*')
        .order('created_at', { ascending: false })
        .range((page - 1) * NUMOFFETCHMOREQUIZ, page * NUMOFFETCHMOREQUIZ - 1);
      if (error) throw new Error(error.message);
      return Response.json(data);
    }
    case 'allLike': {
      const { data, error } = await supabase.rpc('get_top_quizzes_with_comment_ids', { limit_value: TOPLIKESQUIZZES });
      if (error) throw new Error(error.message);
      return Response.json(data);
    }
    case 'thatQuiz': {
      const quiz_id = searchParams.get('quiz_id') as string;
      const { data, error } = await supabase.from('quiz').select('*').eq('quiz_id', quiz_id).single();
      if (error) throw new Error(error.message);
      return Response.json(data);
    }
    case 'thatQuizlike': {
      const quiz_id = searchParams.get('quiz_id') as string;
      const { data, error } = await supabase.from('quiz_like').select('quiz_id, users').eq('quiz_id', quiz_id);
      if (error) throw new Error(error.message);
      return Response.json(data);
    }
    case 'thisCreatorQuiz': {
      const creator = searchParams.get('creator') as string;
      const { data, error } = await supabase
        .from('quiz')
        .select('*')
        .eq('creator', creator)
        .order('created_at', { ascending: false });
      if (error) throw new Error(error.message);
      return Response.json(data);
    }
    case 'quizComments': {
      const page = Number(searchParams.get('pageParam'));
      const quiz_id = searchParams.get('quiz_id') as string;
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('quiz_id', quiz_id)
        .order('created_at', { ascending: false })
        .range((page - 1) * FETCHMORECOMMENTSNUM, page * FETCHMORECOMMENTSNUM - 1);
      if (error) throw new Error(error.message);
      return Response.json(data);
    }
    default:
      return new Response('Invalid type', { status: 400 });
  }
}

// export const POST = async (req: Request) => {
//   const supabase = serverSupabase();
//   const { quiz_id, user_id } = await req.json();
//   const { data, error } = await supabase.rpc('append_user_id_to_quiz_like', { quiz_id, user_id });
//   if (error) throw new Error(error.message);
//   if (error) return new Response('fail to update quiz_like', { status: 500 });

//   return Response.json(data);
// };
