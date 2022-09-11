import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
    // Token will exist if user is logged in
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    // Allow request if the following is true
    const { pathname } = req.nextUrl.clone();
    if (pathname.includes('/api/auth') || token) {
        return NextResponse.next();
    }

    // Redirect to login if token doesn't exist or requesting a protected route
    if (!token && pathname !== '/login') {
        return NextResponse.redirect(new URL('/login', await req.url));
    }
}

export const config = {
    matcher: '/'
};
