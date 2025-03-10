"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

function AuthHandler() {
  const router = useRouter();

  useEffect(() => {
    // 현재 URL에서 쿼리 파라미터를 추출
    const queryParams = new URLSearchParams(window.location.search);
    const accessToken = queryParams.get("access_token");

    if (accessToken) {
      console.log("Access Token:", accessToken);
      Cookies.set("accessToken", accessToken, { expires: 7 });
      router.push("/home.html");
    } else {
      alert("로그인 실패");
      router.push("/login/loginMain.html");
    }
  }, [router]);

  return <div>로그인 처리 중...</div>;
}

export default function AuthCallback() {
  return <AuthHandler />;
}
