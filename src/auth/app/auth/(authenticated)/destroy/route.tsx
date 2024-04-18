import { NextResponse, type NextRequest } from 'next/server';
import * as Sentry from '@sentry/nextjs';
import { createTRPCRoute } from '@/app/(app)/_utils/trpc/create-trpc-route';
import { baseUrl } from '@/config/app';

export async function GET(request: NextRequest) {
  const headers = new Headers();
  const trpcRoute = await createTRPCRoute(request, headers);

  try {
    await trpcRoute.auth.destroy();
  } catch (err) {
    Sentry.captureException(err);
  }

  return NextResponse.redirect(baseUrl, {
    headers,
  });
}
