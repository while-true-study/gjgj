"use client";

import BackHeader from "@/app/components/backHeader/BackHeader";
import React, { useState } from "react";
import styles from "./homeSearch.module.css";

const page = () => {
  const [query, setQuery] = useState("");
  const handleSubmit = () => {
    console.log("검색하기");
  };
  return (
    <div className="searchBox">
      <BackHeader></BackHeader>
      <div className={styles.headText}>
        <p>찾으시는 공모전이</p>
        <p>있으신가요?</p>
      </div>
      <form className={styles.searchBar} onSubmit={handleSubmit}>
        <input
          className={styles.searchInput}
          type="text"
          value={query}
          placeholder="제목이나 카테고리를 검색해보세요."
          onChange={(e) => setQuery(e.target.value)}
        ></input>
        <button className={styles.searchButton} type="submit">
          <img src="/TopBarHome/search.svg" />
        </button>
      </form>
      <div className={styles.content}>
        <div className={styles.box}>
          <img src="/home/!.svg"></img>
          <p>검색 결과가 없어요.</p>
          <p>다른 다른 키워드로 검색해 보세요.</p>
        </div>
      </div>
    </div>
  );
};

export default page;
