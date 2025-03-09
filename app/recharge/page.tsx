"use client";

import React, { useEffect, useState } from "react";
import styles from "./recharge.module.css";
import BackHeader from "../components/backHeader/BackHeader";
import RechargeMenu from "./components/RechargeMenu/RechargeMenu";
import TakeOut from "./components/TakeOut/TakeOut";
import Cookies from "js-cookie";
import axios from "axios";

const Recharge = () => {
  const accessToken = Cookies.get("accessToken");
  const [myCash, setMyCash] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>("충전");
  const recordClick = () => {
    window.location.href = "/recharge/cashhistory";
  };

  useEffect(() => {
    axios
      .get("http://211.188.52.119:8080/api/mypage/profile", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setMyCash(res.data.result.point);
      });
  }, []);

  return (
    <>
      <div className={styles.content}>
        <BackHeader></BackHeader>
        <div className={styles.headBar}>
          <span
            className={activeTab === "충전" ? styles.select : ""}
            onClick={() => setActiveTab("충전")}
          >
            충전하기
          </span>
          <span
            className={activeTab === "인출" ? styles.select : ""}
            onClick={() => setActiveTab("인출")}
          >
            인출하기
          </span>
          <div
            className={styles.underline}
            style={{
              left: activeTab === "충전" ? "0%" : "50%",
            }}
          ></div>
        </div>
        <div>
          {activeTab === "충전" ? (
            <RechargeMenu></RechargeMenu>
          ) : (
            <TakeOut money={myCash}></TakeOut>
          )}
        </div>

        <div className={styles.record} onClick={recordClick}>
          <img src="/Recharge/history.svg"></img>
          <span>내역</span>
        </div>
      </div>
    </>
  );
};

export default Recharge;
