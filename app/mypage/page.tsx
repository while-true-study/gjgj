"use client";

import React from "react";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import styles from "./mypage.module.css";
import MenuBar from "./components/menuBar/MenuBar";
import Profile from "./components/profile/Profile";

const page = () => {
  const loginClick = () => {
    console.log("로그인하기");
  };
  return (
    <>
      <div className={`${styles.content} overflow-auto scrollbar-hide`}>
        <div>
          <Profile name="아이스크림먹고싶다" profileNum={4}></Profile>
          {/* <button className={styles.loginbutton} onClick={loginClick}>
          로그인
        </button> */}
        </div>
        <div className={styles.cashBox}>
          <div className={styles.cashbar}>
            <span>보유캐시</span>
            <span>0</span>
          </div>
          <div className="mt-3">
            <button>충전하기</button>
          </div>
        </div>
        <div className={styles.menuBox}>
          <MenuBar title="주최한 공모전" linkTo="/"></MenuBar>
          <MenuBar title="출품한 공모전" linkTo="/"></MenuBar>
          <MenuBar title="스크랩" linkTo="/home"></MenuBar>
          <MenuBar title="계좌 관리" linkTo="/home" register={true}></MenuBar>
          <MenuBar title="충전/인출" linkTo="/home"></MenuBar>
          <MenuBar title="공지사항" linkTo="/home"></MenuBar>
          <MenuBar title="고객센터" linkTo="/home"></MenuBar>
          <MenuBar
            title="서비스 이용약관"
            linkTo="/mypage/termsOfUse"
          ></MenuBar>
          <MenuBar
            title="개인 처리 방침"
            linkTo="/mypage/personalPolicy"
          ></MenuBar>
        </div>
      </div>
      <NavigationBar></NavigationBar>
    </>
  );
};

export default page;
