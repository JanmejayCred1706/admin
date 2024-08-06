import { allowedLabelsFor } from '@functions/LayoutFn';
import { allRoutes, fetchToken } from '@functions/globalFn';
import { NextRequest, NextResponse } from 'next/server';

const unProtectedRoutes = ['/login'];

export default async function middleware(
  req: NextRequest
): Promise<NextResponse> {
  let protectedRoutes: string[] = [];
  const token = await fetchToken(req);

  try {
    const role = await allowedLabelsFor();
    protectedRoutes = role || [];
  } catch (err) {
    console.error(err);
  }

  // Filter out routes that are not in the protected routes
  const allRouteValues = Object.values(allRoutes);
  const unFetchedRoutes = ['admin/dashboard/analytics'];
  // const unFetchedRoutes = allRouteValues.filter(
  //   (route) => !protectedRoutes.includes(route)
  // );

  // Redirect to login if token is missing and accessing protected route
  if (!token && protectedRoutes.includes(req.nextUrl.pathname)) {
    const loginUrl = new URL('/login', req.nextUrl.origin);
    return NextResponse.redirect(loginUrl.toString());
  }

  // Redirect to 404 if token is present and accessing an unwanted / unaccessed route
  // if (token && unFetchedRoutes.includes(req.nextUrl.pathname)) {
  //   const url = new URL('/404', req.nextUrl.origin);
  //   return NextResponse.redirect(url.toString());
  // }

  // Redirect to dashboard if token is present and accessing login route
  if (token && unProtectedRoutes.includes(req.nextUrl.pathname)) {
    const dashboardUrl = new URL('/admin/dashboard', req.nextUrl.origin);
    return NextResponse.redirect(dashboardUrl.toString());
  }

  // Allow the request to proceed if none of the conditions match
  return NextResponse.next();
}
