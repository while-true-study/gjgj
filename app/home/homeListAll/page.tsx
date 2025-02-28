"use client";

import React, { useEffect, useState } from "react";
import styles from "./homeListAll.module.css";
import axios from "axios";
import BackHeader from "@/app/components/backHeader/BackHeader";
import Contest from "@/app/components/Contest/Contest";

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
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/home/homeListAll`, {
        params: {
          listType: 5,
        },
      })
      .then((res) => {
        setData(res.data.result);
        console.log(data);
      })
      .catch((err) => {
        console.log("Get Error", err);
      });
  }, []);

  return (
    <div className={styles.content}>
      <BackHeader></BackHeader>
      {data ? (
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
      ) : (
        <>로딩중</>
      )}
    </div>
  );
};

export default Page;
