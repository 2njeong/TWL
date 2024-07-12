import { DAY_OF_FETCH_ALGORITHM } from '@/constants/algorithmConstants';
import { serverSupabase } from '@/supabase/server';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const supabase = serverSupabase();

  const currentDate = new Date();

  // 3일 전 날짜를 계산합니다.
  const threeDaysAgo = new Date(currentDate);
  threeDaysAgo.setDate(currentDate.getDate() - DAY_OF_FETCH_ALGORITHM);

  // 데이터베이스의 'created_at' 필드와 일치하는 형식으로 날짜를 포맷합니다.
  const threeDaysAgoISOString = threeDaysAgo.toISOString();

  const { data, error } = await supabase
    .from('algorithm')
    .select('algorithm_id, created_at') // created_at 필드도 선택하여 확인합니다.
    .gte('created_at', threeDaysAgoISOString)
    .order('created_at', { ascending: false })
    .range(0, 9);

  if (error) {
    console.error('알고리즘 데이터를 가져오는 중 오류 발생:', error.message);
    throw new Error(error.message);
  }
  if (error) return new Response('fail to select algorithm', { status: 500 });
  return Response.json(data);
}
