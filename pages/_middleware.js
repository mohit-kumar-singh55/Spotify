import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    const url = req.nextUrl.clone()

    // Token will exists if the user is logged in
    const token = await getToken({ req, secret: process.env.JWT_SECRET })

    const { pathname } = req.nextUrl;

    // Allow the requests if the following is true
    // if its a request for next-auth session and providers fetching || token exists
    if (pathname.includes('/api/auth') || token) {
        return NextResponse.next();
    }

    // Redirect them to login page if they don't have a token
    if (!token && pathname !== '/login') {
        url.pathname = '/login'
        return NextResponse.redirect(url);
    }
}