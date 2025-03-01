"use client";

import React from "react";
import styles from "./category.module.css";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import CategoryBar from "./components/CategoryBar/CategoryBar";
import ContentBox from "./components/ContentBox/ContentBox";
import Link from "next/link";

const page = () => {
  return (
    <div className="h-full relative">
      <img src="/category/fullimg.svg" alt="사진" />
      <div className={styles.search}>
        <Link href="/home/homeSearch">
          <img src="/TopBarHome/search.svg" alt="검색"></img>
        </Link>
      </div>
      <div className={styles.category}>
        <CategoryBar></CategoryBar>
      </div>
      <div className={`${styles.content} overflow-auto scrollbar-hide`}>
        <ContentBox
          tag="로고"
          name="일이삼사오육칠팔구십"
          dday={60}
          title="공모전제목은 최대 삼공모전제목은 최대 삼십자입니다."
          loveit={5}
          comment={12}
        ></ContentBox>
        <ContentBox
          tag="로고"
          name="일이삼사오육칠팔구십"
          dday={60}
          title="공모전제목은 최대 삼공모전제목은 최대 삼십자입니다."
          loveit={5}
          comment={12}
        ></ContentBox>
        <ContentBox
          tag="로고"
          name="일이삼사오육칠팔구십"
          dday={60}
          title="공모전제목은 최대 삼공모전제목은 최대 삼십자입니다."
          loveit={5}
          comment={12}
        ></ContentBox>
        <ContentBox
          tag="로고"
          name="일이삼사오육칠팔구십"
          dday={60}
          title="공모전제목은 최대 삼공모전제목은 최대 삼십자입니다."
          loveit={5}
          comment={12}
        ></ContentBox>
        <ContentBox
          tag="로고"
          name="일이삼사오육칠팔구십"
          dday={60}
          title="공모전제목은 최대 삼공모전제목은 최대 삼십자입니다."
          loveit={5}
          comment={12}
        ></ContentBox>
        <NavigationBar state={2}></NavigationBar>
      </div>
    </div>
  );
};

export default page;
