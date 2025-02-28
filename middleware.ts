import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;

  // if (!token && req.nextUrl.pathname.startsWith("")) {
  //   // / 경로 설정하면 token없이 못들어감
  //   console.log("로그인 페이지로 리다이렉트!");
  //   return NextResponse.redirect(new URL("/login/input", req.url));
  // }

  return NextResponse.next();
}
