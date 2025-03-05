"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./BackHeader.module.css";
import { useRouter } from "next/navigation";

interface BackHeaderProps {
  setViewModal: Dispatch<SetStateAction<boolean>>;
}

const BackHeaderMore: React.FC<BackHeaderProps> = ({ setViewModal }) => {
  const router = useRouter();
  const [view, setView] = useState(false); // 메뉴 토글

  const toggleMenu = () => {
    setView((prev) => !prev); // 메뉴 토글
  };

  const handleBackClick = () => {
    router.back();
  };

  const handleMenuClick = () => {
    setViewModal((prev) => !prev);
  };

  return (
    <div className={styles.navContainer}>
      <button className={styles.backButton} onClick={handleBackClick}>
        <img src="/back.svg" alt="뒤로가기" className={styles.icon} />
      </button>
      <img
        src="/menu.svg"
        alt="메뉴"
        className={styles.icon}
        onClick={toggleMenu}
      ></img>
      {view && (
        <div onClick={handleMenuClick} className={styles.menuBox}>
          <span>삭제</span>
          <img src="/delete.svg" alt="삭제" width={24}></img>
        </div>
      )}
    </div>
  );
};

export default BackHeaderMore;
