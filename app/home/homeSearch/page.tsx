"use client";

import BackHeader from "@/app/components/backHeader/BackHeader";
import React, { useState } from "react";
import styles from "./homeSearch.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import { HomeListItem } from "@/types";
import Contest from "@/app/components/Contest/Contest";

const Page = () => {
  const [query, setQuery] = useState<string>(""); // 입력된 검색어
  const [hasSearched, setHasSearched] = useState(false);
  // const accessToken = Cookies.get("accessToken");
  const userId = Cookies.get("userId");
  const [data, setData] = useState<HomeListItem[]>([]);

  const handleSubmit = () => {
    setHasSearched(true); // ✅ 검색 실행 여부 업데이트
    axios
      .get("http://211.188.52.119:8080/api/board/searchBoardList", {
        params: {
          userId: userId,
          search: query,
        },
      })
      .then((res) => {
        setData(res.data.result);
        console.log(data);
      });
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
          className={styles.searchInput}
          type="text"
          value={query}
          placeholder="제목이나 카테고리를 검색해보세요."
          onChange={(e) => setQuery(e.target.value)}
        ></input>
        <button onClick={handleSubmit} className={styles.searchButton}>
          <img src="/TopBarHome/search.svg" />
        </button>
      </div>
      {data.length != 0 && (
        <p className={styles.searchText}>'{query}'에 대한 검색 결과예요.</p>
      )}
      <div className={styles.content}>
        {hasSearched &&
          (data.length === 0 ? (
            <div className={styles.box}>
              <img src="/home/!.svg" alt="결과 없음" />
              <p>검색 결과가 없어요.</p>
              <p>다른 키워드로 검색해 보세요.</p>
            </div>
          ) : (
            <div>
              {data.map((i) => (
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
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Page;
