"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import BackHeader from "@/app/components/backHeader/BackHeader";
import Input from "@/app/components/input/Input";
import { Button } from "@/app/components/button/button";
import Image from "next/image";
import api from "@/app/lib/api";
import styles from "./signUp.module.css";

export default function SignUp2() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    verEmail: "",
    id: "",
    password: "",
    verPassword: "",
    nickname: "",
    selectedImage: 1,
  });

  const [verify, setVerify] = useState(false);
  const [emailMsg, setEmailMsg] = useState("");

  const profileImages = [1, 2, 3, 4];

  const isButtonActive =
    !!form.name.trim() &&
    !!form.email.trim() &&
    verify &&
    !!form.id.trim() &&
    !!form.password.trim() &&
    form.password === form.verPassword;

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleImageClick = (imageNumber: number) => {
    setForm((prev) => ({ ...prev, selectedImage: imageNumber }));
  };

  const handleNextStep = () => setStep(step + 1);

  const requestEmailVerification = async () => {
    try {
      await api.post("/api/emails", { email: form.email });
      setEmailMsg("이메일 인증번호가 발송되었습니다.");
    } catch (error) {
      setEmailMsg("이메일 인증 요청 실패");
      console.error(error);
    }
  };

  const verifyEmail = async () => {
    try {
      const res = await api.post("/api/emails/verify", {
        accountId: form.email,
        authCode: form.verEmail,
      });
      setVerify(res.data.isSuccess);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegisterClick = async () => {
    try {
      const signUpData = {
        accountId: form.id,
        password: form.password,
        nameKo: form.name,
        nickName: form.nickname,
        email: form.email,
        userImg: `/profile/profile${form.selectedImage}.svg`,
        agreeService: true,
        agreeInfo: true,
      };
      await api.post("/api/signup", signUpData);
      router.push("/login/input");
    } catch (error) {
      console.error("회원가입 실패", error);
    }
  };

  return (
    <div className="flex flex-col h-full p-5">
      <BackHeader />

      {step === 1 && (
        <>
          <div className="flex mr-auto items-center mt-8">
            <span className="text-1.5xl font-medium mr-2 text-fontcolor font-ef-aone">
              끄적끄적
            </span>
            <span className="text-2xl font-bold">회원이 아니신가요?</span>
          </div>
          <p className="text-2xl font-bold mr-auto mb-14">1분이면 충분해요!</p>

          <div className="w-full h-full max-w-sm flex flex-col gap-4 items-start">
            <Input
              label="이름"
              type="text"
              name="name"
              id="name"
              onChange={handleChange("name")}
              value={form.name}
              classname="mb-6"
            />
            <Input
              label="이메일"
              type="email"
              name="email"
              id="email"
              onChange={handleChange("email")}
              value={form.email}
              rightBox={
                <div
                  className={styles.Reqcall}
                  onClick={requestEmailVerification}
                >
                  <span>인증요청</span>
                </div>
              }
            />
            <p className={styles.errMsg}>{emailMsg}</p>

            <Input
              label="인증번호"
              type="text"
              name="verEmail"
              id="verEmail"
              onChange={handleChange("verEmail")}
              value={form.verEmail}
              rightBox={
                <div className={styles.Reqcall} onClick={verifyEmail}>
                  {verify && (
                    <img className={styles.checkimg} src="/smallcheck.svg" />
                  )}
                  <span>확인</span>
                </div>
              }
              classname="mb-6 relative"
            />

            <Input
              label="아이디"
              type="text"
              name="id"
              id="id"
              onChange={handleChange("id")}
              value={form.id}
              classname="mb-6"
            />
            <Input
              label="비밀번호"
              type="password"
              name="password"
              id="password"
              onChange={handleChange("password")}
              value={form.password}
              classname="mb-6"
            />
            <Input
              label="비밀번호 확인"
              type="password"
              name="verPassword"
              id="verPassword"
              onChange={handleChange("verPassword")}
              value={form.verPassword}
            />

            {form.password !== form.verPassword &&
              form.verPassword.length > 0 && (
                <p className={styles.errMsg}>비밀번호가 일치하지 않습니다.</p>
              )}

            <Button
              label="다음으로"
              isActive={isButtonActive}
              onClick={handleNextStep}
              className="mb-5 mt-5"
            />
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className={styles.title}>
            <p>만나서 반가워요!</p>
            <p>활동할 이름을 알려주세요</p>
          </div>

          <form className={styles.nicknameInput}>
            <Input
              label="닉네임"
              type="text"
              name="nickname"
              id="nickname"
              onChange={handleChange("nickname")}
              value={form.nickname}
              rightBox={
                <div className={styles.charCount}>
                  <span>{form.nickname.length}/10</span>
                </div>
              }
            />
            <p className={styles.warnMessage}>
              10자리 이내, 문자/숫자로 작성해주세요.
            </p>
          </form>

          <p className={styles.title2}>프로필 이미지</p>

          <div className={styles.profileImageContainer}>
            <div className={styles.imageContainer}>
              {profileImages.map((num) => (
                <div
                  key={num}
                  className={`${styles.imageWrapper} ${
                    form.selectedImage === num ? styles.selected : ""
                  }`}
                  onClick={() => handleImageClick(num)}
                >
                  <Image
                    src={`/profile/profile${num}.svg`}
                    alt={`프로필 ${num}`}
                    width={64}
                    height={64}
                  />
                </div>
              ))}
            </div>
          </div>

          <Button
            label="가입하기"
            onClick={handleRegisterClick}
            className={styles.registerButton}
          />
        </>
      )}
    </div>
  );
}
