"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./BackHeader.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
        {/* <img src="/back.svg" alt="뒤로가기" className={styles.icon} /> */}
        <Image
          src="/back.svg"
          alt="뒤로가기"
          className={styles.icon}
          width={30}
          height={30}
        ></Image>
      </button>
      <Image
        src="/menu.svg"
        alt="메뉴"
        className={styles.icon}
        onClick={toggleMenu}
        width={30}
        height={30}
      ></Image>
      {/* <img
        src="/menu.svg"
        alt="메뉴"
        className={styles.icon}
        onClick={toggleMenu}
      ></img> */}
      {view && (
        <div onClick={handleMenuClick} className={styles.menuBox}>
          <span>삭제</span>
          <Image src="/delete.svg" alt="삭제" width={24} height={24}></Image>
          {/* <img src="/delete.svg" alt="삭제" width={24}></img> */}
        </div>
      )}
    </div>
  );
};

export default BackHeaderMore;
