"use client";

import React, { useEffect, useState } from "react";
import styles from "./priceselect.module.css";
import BackHeader from "@/app/components/backHeader/BackHeader";

const PriceselectPage = () => {
  const [amount, setAmount] = useState<string | null>(null);

  useEffect(() => {
    // 클라이언트에서만 실행
    const urlParams = new URLSearchParams(window.location.search);
    const amountFromParams = urlParams.get("amount");
    setAmount(amountFromParams); // amount 상태를 업데이트
  }, []);

  const call = () => {
    console.log("요청하기");
  };

  return (
    <div className={styles.content}>
      <BackHeader />
      <div className={styles.title}>
        <p>충전이 필요한 금액을</p>
        <p>이체 후 인증해 주세요.</p>
      </div>
      <div className={styles.bankname}>
        <span>Bank Name</span>
        <div className={styles.copy}>
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
        <span onClick={call} className={styles.call}>
          인증요청
        </span>
      </div>
    </div>
  );
};

export default PriceselectPage;
