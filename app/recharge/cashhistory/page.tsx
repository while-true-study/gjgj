"use client";

import BackHeader from "@/app/components/backHeader/BackHeader";
import React, { useEffect, useState } from "react";
import styles from "./cashhistory.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import { HisUser } from "@/types";
import HistoryBar from "../components/historyBar/HistoryBar";

const Page = () => {
  const [range, setRange] = useState<string>("all");
  const [date, setDate] = useState<string>("all");
  const [hisData, setHisData] = useState<HisUser[]>([]);
  const accessToken = Cookies.get("accessToken");

  useEffect(() => {
    axios
      .get("http://211.188.52.119:8080/api/point", {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { period: date },
      })
      .then((res) => setHisData(res.data.result));
  }, [date]);

  const filteredData = hisData.filter((item) => {
    // 필터링하기
    if (range === "all") return true;
    return item.pointType === range;
  });

  return (
    <div className="p-5">
      <BackHeader />
      <div className={styles.titleBox}>
        <span className={styles.titletext}>보유캐시</span>
        <span className={styles.titletext}>
          {hisData.length > 0
            ? hisData[0].member.point.toLocaleString("ko-KR")
            : "0"}
        </span>
      </div>
      <div className={styles.selBox}>
        <select
          className={styles.selectBox}
          name="range"
          id="range"
          value={range}
          onChange={(e) => setRange(e.target.value)}
        >
          <option value="all">전체</option>
          <option value="add">충전</option>
          <option value="remove">인출</option>
        </select>
        <select
          className={styles.selectBox}
          name="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        >
          <option value="all">전체</option>
          <option value="1w">최근 1주일</option>
          <option value="3m">최근 3개월</option>
          <option value="6m">최근 6개월</option>
        </select>
      </div>
      <div className={styles.content}>
        {filteredData.length > 0 ? (
          filteredData.map((i, index) => (
            <HistoryBar
              key={index}
              type={i.pointType === "add" ? "충전" : "인출"}
              time={i.createdAt.replace("T", " ")}
              cash={i.changePoint}
            />
          ))
        ) : (
          <p>표시할 데이터가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
