"use client";

import React, { useEffect, useState } from "react";
import styles from "./priceselect.module.css";
import BackHeader from "@/app/components/backHeader/BackHeader";
import axios from "axios";
import Cookies from "js-cookie";
import { Button } from "@/app/components/button/button";

const PriceselectPage = () => {
  const [amount, setAmount] = useState<string | null>(null); // 요청 금액
  const [bankData, setBankData] = useState<{
    bankCode: string;
    bankAccount: string;
  } | null>(null);
  const accessToken = Cookies.get("accessToken");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const amountFromParams = urlParams.get("amount");
    setAmount(amountFromParams);

    axios
      .get("http://211.188.52.119:8080/api/mypage/bank-info", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setBankData(res.data.result);
        console.log(bankData);
      });
  }, []);

  const call = () => {
    const formData = new FormData();
    formData.append("changePoint", amount?.toString() ?? `${amount}`);
    formData.append("pointType", "add");
    axios
      .post("http://211.188.52.119:8080/api/point", formData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        if (res.data.isSuccess) {
          window.location.href = "/complete.html?complete=충전 요청&type=1";
        }
      });
  };

  const handleCopy = () => {
    const textCopy = "카카오뱅크 3333282520931";

    navigator.clipboard
      .writeText(textCopy)
      .then(() => {
        alert("복사되었습니다!");
      })
      .catch((err) => {
        console.error("복사 실패:", err);
        alert("http 클립보드 접근이 차단되었습니다. 수동으로 복사해 주세요.");
      });
  };

  return (
    <div className={styles.content}>
      <BackHeader />
      <div className={styles.title}>
        <p className={styles.titletext}>충전이 필요한 금액을</p>
        <p className={styles.titletext}>이체 후 인증해 주세요.</p>
      </div>
      <p className={styles.warning}>
        유저의 실명과 예금주명이 일치해야 캐시 충전이 가능합니다
      </p>
      <div className={styles.bankname}>
        <span>{"카카오뱅크"}</span>
        <span>{"3333-28-2520931"}</span>
        <div className={`${styles.copy} cursor-pointer`} onClick={handleCopy}>
          <img src="/Recharge/copy.svg" alt="복사" />
          <span>복사</span>
        </div>
      </div>
      <div className={styles.Box}>
        <div className={styles.amountBox}>
          <span className={styles.recharge}>충전 금액</span>
          <span className={styles.amount}>
            {amount ? `${amount}원` : "로딩 중..."}
          </span>
        </div>
      </div>
      <div className={styles.footer}>
        <Button
          label="충전요청"
          onClick={call}
          className="font-semibold text-base"
        ></Button>
      </div>
    </div>
  );
};

export default PriceselectPage;
