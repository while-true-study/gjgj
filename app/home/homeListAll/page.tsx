"use client";

import React, { useEffect, useState } from "react";
import styles from "./homeListAll.module.css";
import axios from "axios";
import BackHeader from "@/app/components/backHeader/BackHeader";
import Contest from "@/app/components/Contest/Contest";
import Cookies from "js-cookie";

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

const Page = () => {
  const [data, setData] = useState<HomeListItem[]>([]);
  const accessToken = Cookies.get("accessToken");
  useEffect(() => {
    axios
      .get(`http://211.188.52.119:8080/api/board/home_list`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          listType: 5,
        },
      })
      .then((res) => {
        setData(res.data.result.homeList);
        console.log(data);
      })
      .catch((err) => {
        console.log("Get Error", err);
      });
  }, []);

  return (
    <div className={styles.content}>
      <BackHeader></BackHeader>
      {data.length > 0 ? (
        data.map((i) => {
          return (
            <Contest
              boardId={i.boardId}
              category={1}
              key={i.boardId}
              organizer={i.nickName}
              Dday={i.endCount}
              Iloveit={i.goodChk === 1}
              loveit={i.goodCount}
              comment={i.replyCount}
              title={i.title}
            />
          );
        })
      ) : (
        <p>로딩중...</p> // 데이터가 없을 때 로딩 중 표시
      )}
    </div>
  );
};

export default Page;
