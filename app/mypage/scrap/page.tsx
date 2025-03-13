"use client";

import React, { useEffect, useState } from "react";
import styles from "./scrap.module.css";
import axios from "axios";
import BackHeader from "@/app/components/backHeader/BackHeader";
import Cookies from "js-cookie";
import Contest from "@/app/components/Contest/Contest";
import { HomeListItem } from "@/types";

const Page = () => {
  const [scrapData, setScrapData] = useState<HomeListItem[]>([]);
  const [load, setLoad] = useState(true);
  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    axios
      .get("http://211.188.52.119:8080/api/mypage/scraplist", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setScrapData(res.data.result);
        setLoad(false);
      });
  }, []);
  return (
    <div className={styles.content}>
      <BackHeader></BackHeader>
      {load ? (
        <div>불러오는 중...</div>
      ) : (
        <div className={styles.contestBox}>
          {scrapData &&
            scrapData.map((i) => {
              return (
                <Contest
                  boardId={i.boardId}
                  category={Number(i.category)}
                  key={i.boardId}
                  organizer={i.nickName}
                  Dday={i.daysUntilEnd}
                  Iloveit={i.goodChk === 1 ? true : false}
                  loveit={i.goodsCount}
                  comment={i.replyCount}
                  title={i.title}
                ></Contest>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Page;
