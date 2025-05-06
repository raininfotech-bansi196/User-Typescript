import { NextResponse } from "next/server";

export async function middleware(request: any) {
    const token = request.cookies.get("acsmailtkn")?.value;
    console.log(process.env.BASEURL, "process.env.BASEURL");
    let response = await fetch(process.env.BASEURL + "maintenance-status.json")
    let main = await response.json();
    console.log({main});
    
    if (!['/maintenance'].includes(request.nextUrl.pathname) && main.status == 1) {
        return NextResponse.redirect(new URL('/maintenance', request.url))
    }
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