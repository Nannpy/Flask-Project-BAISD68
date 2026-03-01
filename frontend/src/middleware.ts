import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PATHS = ["/dashboard"];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if path needs protection
    const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p));
    if (!isProtected) return NextResponse.next();

    // Check for JWT cookie
    const token = request.cookies.get("access_token_cookie");
    if (!token) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
