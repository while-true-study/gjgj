"use client";
import React, { useState } from "react";
import styles from "./AgreeBar.module.css";

interface AgreeBarProps {
  onChange: (isChecked: boolean) => void;
}

const AgreeBar = ({ onChange }: AgreeBarProps) => {
  const [check, setCheck] = useState(false); // 기본값을 false로 설정

  const checkClick = () => {
    const newCheck = !check;
    setCheck(newCheck);
    onChange(newCheck); // 부모에게 상태 전달
  };

  return (
    <div className={styles.main} onClick={checkClick}>
      <img
        src={check ? `/agreecheck.svg` : "/agreenocheck.svg"}
        alt="check-box"
      />
      <p>서비스 운영약관 동의(필수)</p>
      <img src="/down.svg" alt="down-arrow" />
    </div>
  );
};

export default AgreeBar;
