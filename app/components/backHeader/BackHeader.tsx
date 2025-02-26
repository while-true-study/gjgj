"use client";

import React from "react";
import styles from "./BackHeader.module.css";
import { useRouter } from "next/navigation";

const BackHeader = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className={styles.navContainer}>
      <button className={styles.backButton} onClick={handleBackClick}>
        <img src="/back.svg" alt="뒤로가기" className={styles.icon} />
      </button>
    </div>
  );
};

export default BackHeader;
