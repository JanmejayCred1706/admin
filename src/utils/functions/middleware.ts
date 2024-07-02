import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/admin/plans/all-plans'];

export default function middleware(req: NextRequest) {
  let isUserAuthenticated = true;
  if (
    !isUserAuthenticated &&
    protectedRoutes.includes(req?.nextUrl?.pathname)
  ) {
    const absoluteUrl = new URL('/', req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }
  return NextResponse.next();
}
