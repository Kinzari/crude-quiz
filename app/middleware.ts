import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const isLoggedIn = request.cookies.get('authToken');

  // If the user is not logged in, redirect to the login page
  if (!isLoggedIn && url.pathname.startsWith('/attendance')) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// You can configure where the middleware should run
export const config = {
  matcher: ['/attendance'], // Protect specific routes
};
