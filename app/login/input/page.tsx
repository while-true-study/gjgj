"use client";

import Input from "@/app/components/input/Input";
import BackHeader from "@/app/components/backHeader/BackHeader";
import { useState } from "react";
import styles from "./input.module.css";
import { Button } from "@/app/components/button/button";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function LoginInput() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPW, setViewPW] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const isButtonActive = email.length > 0 && password.length > 0;

  const jsonData = {
    accountId: email,
    password: password,
  };

  const router = useRouter();

  const buttonClick = () => {
    axios
      .post("http://211.188.52.119:8080/api/login", jsonData)
      .then((res) => {
        console.log("Success:", res);
        const token = res.data.result.tokenVo.accessToken; // 직접 변수로 저장
        const userId = res.data.result.userId;
        Cookies.set("accessToken", token, { expires: 1 }); // 쿠키에 저장
        Cookies.set("userId", userId, { expires: 1 }); // 쿠키에 저장
        router.push("/home");
      })
      .catch((err) => {
        setErrMsg(err.message);
      });
  };

  return (
    <div className="flex flex-col h-full p-5 ">
      <BackHeader></BackHeader>
      <p className="text-4xl font-normal mb-14 mr-auto ml-auto text-fontcolor mt-12 font-ef-aone">
        끄적끄적
      </p>

      <div className="w-full max-w-sm flex flex-col gap-4">
        {/* 아이디 입력창 */}
        <Input
          classname={`mb-8 ${password.length > 0 && "inputIn"}`}
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
          name="password"
          id="pw"
          rightBox={
            password.length > 0 && (
              <div onClick={() => setViewPW(!viewPW)} className={styles.EyeBox}>
                <img src={viewPW ? "/CloseEye.png" : "/OpenEye.png"}></img>
              </div>
            )
          }
        />
        {<p className={styles.errmsg}>{errMsg}</p>}
        <Button
          onClick={buttonClick}
          label="로그인"
          isActive={isButtonActive}
          className="mb-8"
        ></Button>
      </div>

      {/* footer 바 */}
      <div className={`${styles.footerbox} ${"w-full"}`}>
        <div
          className={`${styles.footerbox} ${styles.box} ${styles.rightline}`}
        >
          <Link href="/login/missingId">
            <span>아이디 찾기</span>
          </Link>
        </div>

        <div
          className={`${styles.footerbox} ${styles.box} ${styles.rightline}`}
        >
          <Link href="/login/missingPw">
            <span>비번 찾기</span>
          </Link>
        </div>

        <div className={`${styles.footerbox} ${styles.box}`}>
          <Link href="/login/agree">
            <span>회원가입</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
