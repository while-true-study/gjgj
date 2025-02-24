"use client";

import React from "react";
import Image from "next/image";
import styles from "./loginMain.module.css";
import { Button } from "@/app/components/button/button";

export default function LoginMain() {
  const handleKaKaoLogin = () => {
    console.log("카카오 로그인 클릭");
  };

  const handleNaverLogin = () => {
    console.log("네이버 로그인 클릭");
  };

  const handleEmailLogin = () => {
    console.log("이메일 로그인 클릭");
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <p className={styles.line1}>당신의 한줄이</p>
        <p className={styles.line2}>누군가의 영감으로</p>
        <p className={styles.mainTitle}>끄적끄적</p>
        <img src="/loginMain.svg" className={styles.mainLogo} />
        <div className={styles.kakao}>
          <Button
            label={
              <div className={styles.kakaoContent}>
                <Image
                  src="/kakaoIcon.svg"
                  alt="카카오 아이콘"
                  width={18}
                  height={16.8}
                />
                <span>카카오 로그인</span>
              </div>
            }
            className={styles.kakaoButton}
            onClick={handleKaKaoLogin}
          />
        </div>
        <div className={styles.naver}>
          <Button
            label={
              <div className={styles.kakaoContent}>
                <Image
                  src="/naverIcon.svg"
                  alt="네이버 아이콘"
                  width={18}
                  height={16.8}
                />
                <span>네이버 로그인</span>
              </div>
            }
            className={styles.naverButton}
            onClick={handleNaverLogin}
          />
        </div>
        <div className={styles.email}>
          <Button
            label="이메일 로그인"
            className={styles.emailButton}
            onClick={handleEmailLogin}
          />
        </div>
      </div>
    </div>
  );
}
