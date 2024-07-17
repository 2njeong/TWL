import { serverSupabase } from '@/supabase/server';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers
    }
  });

  // response.cookies.set('auth-token', 'your-auth-token-value', {
  //   secure: true, // HTTPS에서만 전송
  //   httpOnly: true, // JavaScript에서 접근 불가
  //   sameSite: 'lax', // 동일 사이트 요청에서만 전송
  //   path: '/', // 쿠키의 경로 설정
  //   maxAge: 60 * 60 * 24 * 7 // 쿠키의 유효 기간 설정 (예: 7일)
  // });

  const supabase = serverSupabase();

  await supabase.auth.getUser();

  return response;
}
