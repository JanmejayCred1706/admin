import { getCookies } from '@utils/cookies';
import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = [
  '/admin/plans/all-plans',
  '/admin/retailers/active-retailers',
  '/admin/service-center/all-service-center',
];

const fetchToken = async () => {
  const cookie = await getCookies('token');
  return cookie;
};
export default function middleware(req: any) {
  const token = false;
  if (!token && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteUrl = new URL('/', req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }
}
