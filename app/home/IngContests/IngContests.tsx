import React, { useEffect, useState } from "react";
import styles from "./IngContests.module.css";
import axios from "axios";
import Link from "next/link";
import Contest from "@/app/components/Contest/Contest";
import Cookies from "js-cookie";
import Competition from "../competition/Competition";

interface HomeListItem {
  title: string; // 제목
  boardId: number; // 공모전 id
  goodChk: number; // 좋아요 수?
  nickName: string; // 주최자 이름
  boardPrize: number; // 현상금
  createdAt: string; // 시작 날짜
  endCount: number; // dday
  goodCount: number; // 좋아요 수
  replyCount: number; // 댓글수
  categoryName: string; // 카테고리 이름
}

const IngContests = () => {
  const [sortState, setSortState] = useState(1);
  const [data, setData] = useState<HomeListItem[]>([]);
  const [competData, setCompetData] = useState<HomeListItem[]>([]);
  const [load, setLoad] = useState(true);

  const allView = () => {};
  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    axios
      .get(`http://211.188.52.119:8080/api/board/home_list`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          listType: sortState,
        },
      })
      .then((res) => {
        console.log(res);
        setData(res.data.result.homeList);
        setCompetData(res.data.result.competitionList);
        setLoad(false);
      })
      .catch((err) => {
        console.log("Get Error", err);
      });
  }, [sortState]);

  return (
    <>
      <div className="pl-5 pr-5">
        <div className="head">
          <div className={styles.TopBox}>
            <span className={styles.ing}>진행 중인 공모전🚀</span>
            <Link href="/home/homeListAll">
              <span className={styles.allview} onClick={allView}>
                전체보기
              </span>
            </Link>
          </div>
          <div className={styles.sortbox}>
            <span
              onClick={() => setSortState(1)}
              className={sortState === 1 ? styles.selBox : ""}
            >
              마감임박순
            </span>
            <span
              onClick={() => setSortState(2)}
              className={sortState === 2 ? styles.selBox : ""}
            >
              좋아요순
            </span>
            <span
              onClick={() => setSortState(3)}
              className={sortState === 3 ? styles.selBox : ""}
            >
              상금높은순
            </span>
          </div>
        </div>
        <div className={styles.content}>
          {load ? (
            <div>불러오는 중...</div>
          ) : (
            data &&
            data.map((i) => {
              return (
                <Contest
                  category={1}
                  key={i.boardId}
                  organizer={i.nickName}
                  Dday={i.endCount}
                  Iloveit={i.goodChk === 1 ? true : false}
                  loveit={i.goodCount}
                  comment={i.replyCount}
                  title={i.title}
                ></Contest>
              );
            })
          )}
        </div>
      </div>
      <Competition competData={competData}></Competition>
    </>
  );
};

export default IngContests;
