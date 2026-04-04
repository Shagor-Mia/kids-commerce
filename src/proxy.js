import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const privateRoute = ["/dashbaord", "/cart", "/checkout"];
export async function proxy(req) {
  //   return NextResponse.redirect(new URL("/", request.url));
  const token = await getToken({ req });
  const isAuthenticated = Boolean(token);
  const reqPath = req.nextUrl.pathname;
  const isPrivateReq = privateRoute.some((route) =>
    req.nextUrl.pathname.startsWith(route),
  );

  if (!isAuthenticated && isPrivateReq) {
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${reqPath}`, req.url),
    );
  }
  console.log({ token, isPrivateReq, reqPath, isAuthenticated });
  return NextResponse.next();
}

export const config = {
  matcher: ["/cart/:path*", "/cart/:path*", "/checkout/:path*"],
};
