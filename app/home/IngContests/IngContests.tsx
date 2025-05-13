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
  // 정렬 옵션 배열
  { label: "마감임박순", value: 1 },
  { label: "좋아요순", value: 2 },
  { label: "상금높은순", value: 3 },
];

const IngContests = () => {
  const [sortState, setSortState] = useState<number>(1); // 정렬 된 상태 관리 state
  const [homeList, setHomeList] = useState<HomeListItem[]>([]); // HomeList받는 배열
  const [competitionList, setCompetitionList] = useState<HomeListItem[]>([]); // 경쟁 치열한 공모전 받는 배열
  const [loading, setLoading] = useState<boolean>(true); // get 받을때 로딩 상태
  const [loveTrigger, setLoveTrigger] = useState<boolean>(false); // 좋아요 상태 관리

  const toggleLoveTrigger = useCallback(() => {
    setLoveTrigger((prev) => !prev); // 좋아요 토글
  }, []);

  const fetchData = useCallback(async () => {
    // 비동기로 get요청 보내는 함수
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
    // 맨처음에 보냄
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div className="pl-5 pr-5">
        <div className="head">
          <div className={styles.TopBox}>
            <span className={styles.ing}>진행 중인 공모전🚀</span>
            <Link href="/home/homeListAll.html">
              <span className={styles.allview}>전체보기</span>
            </Link>
          </div>
          <div className={styles.sortbox}>
            {sortOptions.map(
              (
                { label, value } // 정렬 옵션뿌리고 value로 sortState 바꾸기
              ) => (
                <span
                  key={value}
                  onClick={() => setSortState(value)}
                  className={sortState === value ? styles.selBox : ""}
                >
                  {label}
                </span>
              )
            )}
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
      </div>
      <Competition // 경쟁이 치열한 공모전 뿌리기 컴포넌트
        competData={competitionList}
        loveChange={toggleLoveTrigger}
      />
    </>
  );
};

export default IngContests;
