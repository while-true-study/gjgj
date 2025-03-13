"use client";

import React from "react";
import Image from "next/image";
import styles from "./loginMain.module.css";
import { Button } from "@/app/components/button/button";
import Link from "next/link";

export default function LoginMain() {
  const kakaoUrl =
    "http://211.188.52.119:8080/oauth2/authorization/kakao?redirect_uri=http://gjgj-front.s3-website.ap-northeast-2.amazonaws.com/home&mode=login";
  const naverUrl =
    "http://211.188.52.119:8080/oauth2/authorization/naver?redirect_uri=http://gjgj-front.s3-website.ap-northeast-2.amazonaws.com/&mode=login";

  const handleKaKaoLogin = () => {
    window.location.href = kakaoUrl;
  };

  const handleNaverLogin = () => {
    window.location.href = naverUrl;
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
                <span className={styles.naverText}>네이버 로그인</span>
              </div>
            }
            className={styles.naverButton}
            onClick={handleNaverLogin}
          />
        </div>
        <div className={styles.email}>
          <Link href="/login/input.html">
            <Button
              label="이메일 로그인"
              className={styles.emailButton}
              onClick={handleEmailLogin}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
