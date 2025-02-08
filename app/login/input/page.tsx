"use client";

import Input from "@/app/components/input/Input";
import { Button } from "@/app/components/button/button";
import BackHeader from "@/app/components/backHeader/BackHeader";
import { useState } from "react";
import styles from "./input.module.css";

export default function LoginInput() {
  const findIdClcik = () => {
    console.log("아이디 찾기 버튼");
  };
  const findPwClcik = () => {
    console.log("비밀번호 찾기 버튼");
  };
  const sighUpClcik = () => {
    console.log("회원가입 버튼");
  };

  const [email, setEmail] = useState(""); // 아이디
  const [password, setPassword] = useState(""); // 비밀번호

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const isButtonActive = email.length > 0 && password.length > 0;
  const [viewPW, setViewPW] = useState(false);

  return (
    <div className="flex flex-col h-full p-6 ">
      <BackHeader></BackHeader>
      <p className="text-4xl font-normal mb-14 mr-auto ml-auto text-fontcolor mt-12 font-ef-aone">
        끄적끄적
      </p>

      <form className="w-full max-w-sm flex flex-col gap-4">
        {/* 아이디 입력창 */}
        <Input
          classname="mb-8"
          type="email"
          label="아이디"
          name="id"
          id="id"
          onChange={handleEmailChange}
        />
        <Input
          onChange={handlePasswordChange}
          classname="mb-8"
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
        <Button
          label="로그인"
          isActive={isButtonActive}
          className="mb-8"
        ></Button>
      </form>

      {/* footer 바 */}
      <div className={`${styles.footerbox} ${"w-full"}`}>
        <div
          onClick={findIdClcik}
          className={`${styles.footerbox} ${styles.box} ${styles.rightline}`}
        >
          <span>아이디 찾기</span>
        </div>
        <div
          onClick={findPwClcik}
          className={`${styles.footerbox} ${styles.box} ${styles.rightline}`}
        >
          <span>비번 찾기</span>
        </div>
        <div
          onClick={sighUpClcik}
          className={`${styles.footerbox} ${styles.box}`}
        >
          <span>회원가입</span>
        </div>
      </div>
    </div>
  );
}
