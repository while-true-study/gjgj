"use client";

import React, { useState } from "react";
import styles from "./recharge.module.css";
import BackHeader from "../components/backHeader/BackHeader";
import RechargeMenu from "./components/RechargeMenu/RechargeMenu";
import TakeOut from "./components/TakeOut/TakeOut";

const Recharge = () => {
  const [activeTab, setActiveTab] = useState<string>("인출");
  const recordClick = () => {
    console.log("recordClick");
  };
  return (
    <>
      <BackHeader></BackHeader>
      <div className={styles.content}>
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
            <TakeOut money={5000}></TakeOut>
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
