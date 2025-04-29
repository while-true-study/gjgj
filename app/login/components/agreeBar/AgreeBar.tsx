"use client";
import React, { useState } from "react";
import styles from "./AgreeBar.module.css";
import Link from "next/link";
import Image from "next/image";

interface AgreeBarProps {
  title: string;
  onChange: (isChecked: boolean) => void;
  type: number;
}

const AgreeBar = ({ title, onChange, type }: AgreeBarProps) => {
  const [check, setCheck] = useState(false); // 기본값을 false로 설정

  const checkClick = () => {
    const newCheck = !check;
    setCheck(newCheck);
    onChange(newCheck); // 부모에게 상태 전달
  };

  return (
    <div className={styles.main} onClick={checkClick}>
      <Image
        src={check ? `/agreecheck.svg` : "/agreenocheck.svg"}
        alt="check-box"
        width={24}
        height={25}
      ></Image>
      <p>{title}</p>
      <Link
        href={
          type === 1 ? "/mypage/termsOfUse.html" : "/mypage/personalPolicy.html"
        }
      >
        <Image src="/down.svg" alt="down-arrow" width={24} height={24}></Image>
      </Link>
    </div>
  );
};

export default AgreeBar;
