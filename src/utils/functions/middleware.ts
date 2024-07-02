import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/admin/plans/all-plans', '/admin/finance/invoice'];
const roleBasedRoutes = {
  '/admin/plans/all-plans': ['admin'],
  '/admin/finance/invoice': ['admin'],
  // Add more routes and their roles here
};

export default function middleware(req: NextRequest) {
  console.log('middleware');
  const token = req.cookies.get('token');
  const userRole = req.cookies.get('role'); // Assume user role is stored in cookies

  if (!token && protectedRoutes.includes(req.nextUrl.pathname)) {
    const loginUrl = new URL('/login', req.nextUrl.origin);
    return NextResponse.redirect(loginUrl.toString());
  }

  const requiredRoles = roleBasedRoutes[req.nextUrl.pathname];
  if (requiredRoles && !requiredRoles.includes(userRole)) {
    const noAccessUrl = new URL('/no-access', req.nextUrl.origin);
    return NextResponse.redirect(noAccessUrl.toString());
  }

  return NextResponse.next();
}
