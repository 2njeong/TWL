import { CustomMiddleware } from '@/type/commonType';
import { updateSession } from '@/utils/supabase/middleware';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export const updateSessionMiddleware = (middleware: CustomMiddleware) => {
  return async (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
    await updateSession(request);
    return middleware(request, event, response);
  };
};
