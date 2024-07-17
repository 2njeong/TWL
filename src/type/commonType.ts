import { NextMiddlewareResult } from 'next/dist/server/web/types';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { ReactNode } from 'react';

export type CustomMiddleware = (
  request: NextRequest,
  event: NextFetchEvent,
  response: NextResponse
) => NextMiddlewareResult | Promise<NextMiddlewareResult>;

export type MiddlewareFactory = (middleware: CustomMiddleware) => CustomMiddleware;
