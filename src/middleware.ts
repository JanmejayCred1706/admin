import { fetchToken } from '@functions/globalFn';
import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = [''];
const unProtectedRoutes = ['/login'];

export default async function middleware(
  req: NextRequest
): Promise<NextResponse> {
  const token = await fetchToken(req);

  if (!token && protectedRoutes.includes(req.nextUrl.pathname)) {
    // Redirect to login if token is missing and accessing protected route
    const loginUrl = new URL('/login', req.nextUrl.origin);
    return NextResponse.redirect(loginUrl.toString());
  }
  if (token && protectedRoutes.includes(req.nextUrl.pathname)) {
    // Redirect to login if token is missing and accessing protected route
    const url = new URL('/404', req.nextUrl.origin);
    return NextResponse.redirect(url.toString());
  }

  if (token && unProtectedRoutes.includes(req.nextUrl.pathname)) {
    // Redirect to dashboard if token is present and accessing login route
    const dashboardUrl = new URL('/admin/dashboard', req.nextUrl.origin);
    return NextResponse.redirect(dashboardUrl.toString());
  }

  // Allow the request to proceed if none of the conditions match
  return NextResponse.next();
}
