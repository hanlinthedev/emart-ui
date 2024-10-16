import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "./app/action";
const publicRoutes = ["/login", "/signup", "/"];
const adminRoutes = ["/admin"];

export const middleware = async (request: NextRequest) => {
	const me = await getAuth();

	const token = request.cookies.get("Authentication");
	const isAdmin = me ? me.isAdmin : false;
	if (
		!isAdmin &&
		adminRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
	) {
		return NextResponse.redirect(new URL("/", request.url));
	}
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
