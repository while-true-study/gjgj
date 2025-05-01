"use client";

import React, { useEffect, useState, useCallback } from "react";
import styles from "./IngContests.module.css";
import axios from "axios";
import Link from "next/link";
import Contest from "@/app/components/Contest/Contest";
import Cookies from "js-cookie";
import Competition from "../competition/Competition";
import { HomeListItem } from "@/types";

const sortOptions = [
  { label: "마감임박순", value: 1 },
  { label: "좋아요순", value: 2 },
  { label: "상금높은순", value: 3 },
];

const IngContests = () => {
  const [sortState, setSortState] = useState<number>(1);
  const [homeList, setHomeList] = useState<HomeListItem[]>([]);
  const [competitionList, setCompetitionList] = useState<HomeListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loveTrigger, setLoveTrigger] = useState<boolean>(false);

  const toggleLoveTrigger = useCallback(() => {
    setLoveTrigger((prev) => !prev);
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const userId = Cookies.get("userId");

      const res = await axios.get("/api/board/home_list", {
        params: {
          listType: sortState,
          userId,
        },
      });

      const { homeList, competitionList } = res.data.result;
      setHomeList(homeList);
      setCompetitionList(competitionList);
    } catch (err) {
      console.error("데이터 요청 실패", err);
    } finally {
      setLoading(false);
    }
  }, [sortState, loveTrigger]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="pl-5 pr-5">
      <div className="head">
        <div className={styles.TopBox}>
          <span className={styles.ing}>진행 중인 공모전🚀</span>
          <Link href="/home/homeListAll.html">
            <span className={styles.allview}>전체보기</span>
          </Link>
        </div>
        <div className={styles.sortbox}>
          {sortOptions.map(({ label, value }) => (
            <span
              key={value}
              onClick={() => setSortState(value)}
              className={sortState === value ? styles.selBox : ""}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.content}>
        {loading ? (
          <div>불러오는 중...</div>
        ) : (
          homeList.map((item) => (
            <Contest
              key={item.boardId}
              boardId={item.boardId}
              category={item.categoryId}
              organizer={item.nickName}
              Dday={item.endCount}
              Iloveit={item.goodChk === 1}
              loveit={item.goodCount}
              comment={item.replyCount}
              title={item.title}
              loveChange={toggleLoveTrigger}
            />
          ))
        )}
      </div>

      <Competition
        competData={competitionList}
        loveChange={toggleLoveTrigger}
      />
    </div>
  );
};

export default IngContests;
