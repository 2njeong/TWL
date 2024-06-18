import { serverSupabase } from '@/supabase/server';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers
    }
  });

  const supabase = serverSupabase();

  await supabase.auth.getUser();

  return response;
}
