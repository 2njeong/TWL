import { serverSupabase } from '@/supabase/server';
import { CustomMiddleware } from '@/type/commonType';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export const authMiddleware = (middleware: CustomMiddleware) => {
  return async (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
    const supabase = serverSupabase();
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      // 로그인 안한 유저
      if (request.nextUrl.pathname.startsWith('/member')) {
        return NextResponse.redirect(new URL('/auth', request.url));
      } else if (request.nextUrl.pathname.startsWith('/quiz/makequiz')) {
        return NextResponse.redirect(new URL('/auth', request.url));
      } else if (request.nextUrl.pathname.startsWith('/algorithm')) {
        return NextResponse.redirect(new URL('/auth', request.url));
      }
    }
    return middleware(request, event, response);
  };
};
