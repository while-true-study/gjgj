"use client";

import BackHeader from "@/app/components/backHeader/BackHeader";
import Input from "@/app/components/input/Input";
import styles from "./signUp.module.css";
import React, { useState } from "react";
import { Button } from "@/app/components/button/button";
import axios from "axios";
import Image from "next/image";

export default function SignUp2() {
  const [step, setStep] = useState(1); // 단계 관리
  const [Name, setName] = useState(""); // 본명
  const [email, setEmail] = useState(""); // 이메일
  const [verEmail, setVerEmail] = useState(""); // 인증 번호
  const [verify, setVerify] = useState(false); // 인증 확인
  const [id, setId] = useState(""); // 아이디
  const [password, setPassword] = useState(""); // 비밀번호
  const [verPassword, setVerPassword] = useState(""); // 비밀번호 확인
  const [nickname, setNickname] = useState(""); // 닉네임
  const [selectedImage, setSelectedImage] = useState<number | null>(null); // 프로필 이미지
  const url = "https://gjgj-front.vercel.app";

  const buttonActive =
    Name.trim() !== "" && // 본명 차있고
    email.trim() !== "" && // 이메일 차있고
    verify === true && // 이메일 인증되있고
    id.trim() !== "" && // id차있고
    password.trim() !== "" && // 패스워드 차있고
    password === verPassword; // 패스워드 일치하고

  const ClickReqCall = () => {
    // 이메일 인증요청
    axios.post(`${url}/api/emails`, { email: email });
  };

  const verifyEmail = () => {
    axios
      .post(`${url}/api/emails/verify`, {
        email: email,
        authCode: verEmail,
      })
      .then((res) => {
        setVerify(res.data.isSuccess);
      });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value); // 이름
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value); // 이메일
  };

  const handleVerEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerEmail(e.target.value); // 인증번호
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value); // 아이디
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value); // 비밀번호
  };

  const handleRePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerPassword(e.target.value); // 비밀번호 확인
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 10); // 10자 초과 입력 방지
    setNickname(value);
  };

  const handleImageClick = (imageNumber: number) => {
    setSelectedImage(imageNumber); // 선택한 이미지 번호 저장
  };

  const handleNextStep = () => {
    setStep(step + 1); // 다음 단계로 이동
  };

  const signUpData = {
    accountId: id,
    password: password,
    nameKo: Name,
    nickname: nickname,
    userBirth: "",
    email: email,
    userImg: `${selectedImage}`,
    agreeService: true,
    agreeInfo: true,
  };

  const handleRegisterClick = () => {
    console.log("가입하기 버튼 클릭");
    // 여기에 서버 요청 등 처리
    axios.post(`${url}/api/signup`, signUpData);
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
            <span className="text-2xl font-bold ">회원이 아니신가요?</span>
          </div>
          <p className="text-2xl font-bold mr-auto mb-14">1분이면 충분해요!</p>
          <div className="w-full h-full max-w-sm flex flex-col gap-4 items-start">
            <Input
              label="이름"
              type="text"
              id="getNumber"
              name="getNumber"
              placeholder="본명을 적어주세요."
              classname="mb-6"
              onChange={handleNameChange}
              value={Name}
            />
            <Input
              label="이메일"
              type="email"
              id="email"
              name="email"
              placeholder="이메일을 적어주세요."
              rightBox={
                <div className={styles.Reqcall} onClick={ClickReqCall}>
                  <span>인증요청</span>
                </div>
              }
              onChange={handleEmailChange}
              value={email}
              classname="mb-6"
            />
            <Input
              label="인증번호"
              type="text"
              id="getNumber"
              name="getNumber"
              placeholder="메일로 받은 인증번호를 적어주세요."
              rightBox={
                <div className={styles.Reqcall}>
                  {verify && (
                    <img className={styles.checkimg} src="/smallcheck.svg" />
                  )}
                  <div onClick={verifyEmail}>
                    <span>확인</span>
                  </div>
                </div>
              }
              onChange={handleVerEmailChange}
              value={verEmail}
              classname="mb-6 relative"
            />
            <Input
              label="아이디"
              type="text"
              id="getNumber"
              name="getNumber"
              placeholder="아이디를 적어주세요."
              classname="mb-6"
              value={id}
              onChange={handleIdChange}
            />
            <Input
              label="비밀번호"
              type="password"
              id="getNumber"
              name="getNumber"
              placeholder="비밀번호를 적어주세요."
              classname="mb-6"
              value={password}
              onChange={handlePasswordChange}
            />
            <Input
              label="비밀번호 확인"
              type="password"
              id="getNumber"
              name="getNumber"
              placeholder="비밀번호를 다시 적어주세요."
              value={verPassword}
              onChange={handleRePasswordChange}
            />
            {password !== verPassword && verPassword.length > 0 ? (
              <p className={styles.errMsg}>비밀번호가 일치하지않습니다</p>
            ) : (
              ""
            )}
            <Button
              label="다음으로"
              isActive={buttonActive}
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
              type="text"
              label="닉네임"
              name="nickname"
              id="nickname"
              onChange={handleNicknameChange}
              rightBox={
                <div className={styles.charCount}>
                  <span>{nickname.length}/10</span>
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
              {[1, 2, 3, 4].map((num) => {
                const imageSrc =
                  selectedImage === num
                    ? `/profile/profile${num}selected.svg`
                    : `/profile/profile${num}.svg`;

                return (
                  <div
                    key={num}
                    className={`${styles.imageWrapper} ${
                      selectedImage === num ? styles.selected : ""
                    }`}
                    onClick={() => handleImageClick(num)}
                  >
                    <Image
                      src={imageSrc}
                      alt={`프로필 ${num}`}
                      width={64}
                      height={64}
                    />
                  </div>
                );
              })}
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
