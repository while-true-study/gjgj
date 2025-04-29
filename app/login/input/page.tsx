"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/lib/api";
import Cookies from "js-cookie";
import Input from "@/app/components/input/Input";
import BackHeader from "@/app/components/backHeader/BackHeader";
import { Button } from "@/app/components/button/button";
import Link from "next/link";
import Image from "next/image";
import styles from "./input.module.css";

const footerLinks = [
  { href: "/login/missingId.html", label: "아이디 찾기" },
  { href: "/login/missingPw.html", label: "비번 찾기" },
  { href: "/login/agree.html", label: "회원가입" },
];

export default function LoginInput() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPW, setViewPW] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const router = useRouter();
  const isButtonActive = email.length > 0 && password.length > 0;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const buttonClick = async () => {
    try {
      const res = await api.post("/api/login", {
        accountId: email,
        password,
      });
      console.log("Success:", res);
      const { accessToken, role } = res.data.result.tokenVo;
      const { userId } = res.data.result;

      Cookies.set("accessToken", accessToken, { expires: 1 });
      Cookies.set("userId", userId, { expires: 1 });
      Cookies.set("role", role, { expires: 1 });

      router.push(role === "ADMIN" ? "/admin" : "/home");
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const error = err as { response: { data: { message: string } } };
        setErrMsg(error.response.data.message);
      } else {
        setErrMsg("로그인 요청 중 오류 발생");
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && isButtonActive) {
      buttonClick();
    }
  };

  return (
    <div className="flex flex-col h-full p-5">
      <BackHeader />

      <p className="text-4xl font-normal mb-14 mr-auto ml-auto text-fontcolor mt-12 font-ef-aone">
        끄적끄적
      </p>
      <div className="w-full max-w-sm flex flex-col gap-4">
        <Input
          classname={`mb-8 ${password.length > 0 ? "inputIn" : ""}`}
          type="email"
          label="아이디"
          name="id"
          id="id"
          onChange={handleEmailChange}
        />
        <Input
          onChange={handlePasswordChange}
          classname=""
          type={viewPW ? "text" : "password"}
          label="비밀번호"
          onKeyDown={handleKeyDown}
          name="password"
          id="pw"
          rightBox={
            password.length > 0 && (
              <div onClick={() => setViewPW(!viewPW)} className={styles.EyeBox}>
                <Image
                  src={viewPW ? "/CloseEye.png" : "/OpenEye.png"}
                  alt="비밀번호 보기"
                  width={30}
                  height={30}
                />
              </div>
            )
          }
        />

        {errMsg && <p className={styles.errmsg}>{errMsg}</p>}
        <Button
          onClick={buttonClick}
          label="로그인"
          isActive={isButtonActive}
          className="mb-8"
        />
      </div>

      {/* footer 바 */}
      <div className={`${styles.footerbox} w-full`}>
        {footerLinks.map((link, idx) => (
          <div
            key={idx}
            className={`${styles.footerbox} ${styles.box} ${
              idx < footerLinks.length - 1 ? styles.rightline : ""
            }`}
          >
            <Link href={link.href}>
              <span>{link.label}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
