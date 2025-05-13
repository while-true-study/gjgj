"use client";

import BackHeader from "@/app/components/backHeader/BackHeader";
import React, { useState } from "react";
import styles from "./homeSearch.module.css";
import Cookies from "js-cookie";
import { HomeListItem } from "@/types";
import Contest from "@/app/components/Contest/Contest";
import api from "@/app/lib/api";
import Image from "next/image";

const Page = () => {
  const [query, setQuery] = useState<string>(""); // 검색하고자 하는 문자열 저장하는 곳
  const [hasSearched, setHasSearched] = useState(false); // 검색 했나 안했나 처음은 false 검색 한번이라도 하면 true됌
  const userId = Cookies.get("userId"); // userId확인
  const [data, setData] = useState<HomeListItem[]>([]); // 검색 정보를 받을 배열

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Enter키도 검색 할 수 있도록
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    // 검색하기
    setHasSearched(true);
    try {
      const res = await api.get("/api/board/searchBoardList", {
        params: {
          userId: userId,
          search: query,
        },
      });
      setData(res.data.result);
    } catch (err) {
      console.log("검색 실패함", err);
    }
  };

  return (
    <div className={styles.searchBox}>
      <BackHeader></BackHeader>
      <div className={styles.headText}>
        <p>찾으시는 공모전이</p>
        <p>있으신가요?</p>
      </div>
      <div className={styles.searchBar}>
        <input
          onKeyDown={handleKeyDown}
          className={styles.searchInput}
          type="text"
          value={query}
          placeholder="제목이나 카테고리를 검색해보세요."
          onChange={(e) => setQuery(e.target.value)}
        ></input>
        <button onClick={handleSubmit} className={styles.searchButton}>
          <Image
            src="/TopBarHome/search.svg"
            alt="검색하기 아이콘"
            width={30}
            height={30}
          ></Image>
        </button>
      </div>
      {data.length != 0 && (
        <p className={styles.searchText}>
          &apos;{query}&apos;에 대한 검색 결과예요.
        </p>
      )}
      <div className={styles.content}>
        {hasSearched &&
          (data.length === 0 ? ( // data안이 없으면
            <div className={styles.box}>
              <Image
                src="/home/!.svg"
                alt="결과 없음"
                width={120}
                height={120}
              ></Image>
              <p>검색 결과가 없어요.</p>
              <p>다른 키워드로 검색해 보세요.</p>
            </div>
          ) : (
            <div>
              {data.map(
                (
                  i // data안에 뭐라도 있게되면
                ) => (
                  <Contest
                    key={i.boardId}
                    boardId={i.boardId}
                    organizer={i.nickName}
                    Dday={i.endCount}
                    title={i.title}
                    loveit={i.goodCount}
                    comment={i.replyCount}
                    Iloveit={i.goodChk === 0 ? false : true}
                    category={i.categoryId}
                  />
                )
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Page;
