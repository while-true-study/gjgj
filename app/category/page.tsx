"use client";

import React, { useState } from "react";
import styles from "./category.module.css";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import CategoryBar from "./components/CategoryBar/CategoryBar";
import ContentBox from "./components/ContentBox/ContentBox";
import Link from "next/link";
import useCategoryBoard from "../hooks/categoryBoard";

const Page = () => {
  const [categoryId, setCategoryId] = useState<number>(0);
  const [listType, setListType] = useState<number>(1);
  const changeCategoryId = (categoryId: number) => {
    setCategoryId(categoryId);
  };

  const changeListType = (type: number) => {
    setListType(type);
  };
  const { data } = useCategoryBoard(categoryId.toString(), listType);
  return (
    <div className="h-full relative">
      <img src="/category/fullimg.svg" alt="사진" />
      <div className={styles.search}>
        <Link href="/home/homeSearch">
          <img src="/TopBarHome/search.svg" alt="검색"></img>
        </Link>
      </div>
      <div className={styles.category}>
        <CategoryBar
          categoryId={categoryId}
          changeCategory={changeCategoryId}
          listType={listType}
          chnageListType={changeListType}
        ></CategoryBar>
      </div>
      <div className={`${styles.content} overflow-auto scrollbar-hide`}>
        {data?.map((i) => {
          return (
            <ContentBox
              key={i.boardId}
              tag={i.categoryName}
              name={i.nickName}
              dday={i.endCount}
              title={i.title}
              loveit={i.goodCount}
              comment={i.replyCount}
              boardId={i.boardId}
            ></ContentBox>
          );
        })}
        <NavigationBar state={2}></NavigationBar>
      </div>
    </div>
  );
};

export default Page;
