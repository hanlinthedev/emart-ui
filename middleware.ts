import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/login", "/signup"];

export const middleware = (request: NextRequest) => {
	const token = request.cookies.get("Authentication");
	if (
		!token &&
		!publicRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
	) {
		return NextResponse.redirect(new URL("/login", request.url));
	}
};

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
