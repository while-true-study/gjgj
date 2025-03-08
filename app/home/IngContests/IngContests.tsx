import React, { useEffect, useState } from "react";
import styles from "./IngContests.module.css";
import axios from "axios";
import Link from "next/link";
import Contest from "@/app/components/Contest/Contest";
import Cookies from "js-cookie";
import Competition from "../competition/Competition";
import { HomeListItem } from "@/types";

const IngContests = () => {
  const [sortState, setSortState] = useState(1);
  const [data, setData] = useState<HomeListItem[]>([]);
  const [competData, setCompetData] = useState<HomeListItem[]>([]);
  const [load, setLoad] = useState(true);
  const [loveChange, setLoveChage] = useState(false);
  const loveButton = () => {
    setLoveChage(!loveChange);
  };

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    const userId = Cookies.get("userId");
    axios
      .get(`http://211.188.52.119:8080/api/board/home_list`, {
        // headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          listType: sortState,
          userId: userId,
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
  }, [sortState, loveChange]);

  return (
    <>
      <div className="pl-5 pr-5">
        <div className="head">
          <div className={styles.TopBox}>
            <span className={styles.ing}>진행 중인 공모전🚀</span>
            <Link href="/home/homeListAll">
              <span className={styles.allview}>전체보기</span>
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
                  boardId={i.boardId}
                  category={1}
                  key={i.boardId}
                  organizer={i.nickName}
                  Dday={i.endCount}
                  Iloveit={i.goodChk === 1 ? true : false}
                  loveit={i.goodCount}
                  comment={i.replyCount}
                  title={i.title}
                  loveChange={loveButton}
                ></Contest>
              );
            })
          )}
        </div>
      </div>
      <Competition
        competData={competData}
        loveChange={loveButton}
      ></Competition>
    </>
  );
};

export default IngContests;
