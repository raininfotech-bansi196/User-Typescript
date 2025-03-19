import { NextResponse } from "next/server";

export async function middleware(request: any) {
    const token = request.cookies.get("acsmailtkn")?.value;
    if (!token && !['/login', '/email-verification', '/register', "/forgot-password", "/reset-password", '/'].includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/email-verification',
        '/forgot-password',
        '/register',
        '/reset-password',
        '/maintenance',
        '/profile',
        '/about'
    ],
}