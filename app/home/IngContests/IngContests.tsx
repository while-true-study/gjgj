import Contest from "@/app/components/Contest/Contest";
import React, { useEffect, useState } from "react";
import styles from "./IngContests.module.css";
import axios from "axios";
import Link from "next/link";

interface HomeListItem {
  boardId: number;
  boardPrize: number;
  categoryName: string;
  createdAt: string;
  endCount: number;
  goodChk: number;
  goodCount: number;
  nickName: string;
  replyCount: number;
  title: string;
}

const IngContests = () => {
  const [sortState, setSortState] = useState(1);
  const [data, setData] = useState<HomeListItem[]>([]);

  const [load, setLoad] = useState(true);

  const allView = () => {};
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/home/homeListAll`, {
        params: {
          listType: sortState,
        },
      })
      .then((res) => {
        console.log(res);
        setData(res.data.result);
        setLoad(false);
      })
      .catch((err) => {
        console.log("Get Error", err);
      });
  }, [sortState]);

  return (
    <>
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
          data.map((i, id) => {
            return (
              <Contest
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
    </>
  );
};

export default IngContests;
