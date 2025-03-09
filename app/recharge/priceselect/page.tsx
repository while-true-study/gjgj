"use client";

import React, { useEffect, useState } from "react";
import styles from "./priceselect.module.css";
import BackHeader from "@/app/components/backHeader/BackHeader";
import axios from "axios";
import Cookies from "js-cookie";

const PriceselectPage = () => {
  const [amount, setAmount] = useState<string | null>(null); // 요청 금액
  const [bankData, setBankData] = useState<{
    bankCode: string;
    bankAccount: string;
  } | null>(null);
  const accessToken = Cookies.get("accessToken");

  const banks = [
    { name: "KB국민", code: "004", logo: "/bankImg/국민로고.svg" },
    { name: "기업", code: "003", logo: "/bankImg/기업로고.svg" },
    { name: "농협", code: "011", logo: "/bankImg/농협로고.svg" },
    { name: "산업", code: "002", logo: "/bankImg/산업로고.svg" },
    { name: "수협", code: "007", logo: "/bankImg/수협로고.svg" },
    { name: "신한", code: "088", logo: "/bankImg/신한로고.svg" },
    { name: "우리", code: "020", logo: "/bankImg/우리로고.svg" },
    { name: "우체국", code: "071", logo: "/bankImg/우체국로고.svg" },
    { name: "하나", code: "081", logo: "/bankImg/하나로고.svg" },
    { name: "한국씨티", code: "027", logo: "/bankImg/한국씨티로고.svg" },
    { name: "SC제일", code: "023", logo: "/bankImg/SC제일로고.svg" },
    { name: "카카오뱅크", code: "090", logo: "/bankImg/카카오뱅크로고.svg" },
    { name: "케이뱅크", code: "089", logo: "/bankImg/케이뱅크로고.svg" },
    { name: "토스뱅크", code: "092", logo: "/bankImg/토스뱅크로고.svg" },
    { name: "경남", code: "039", logo: "/bankImg/경남로고.svg" },
    { name: "광주", code: "034", logo: "/bankImg/광주로고.svg" },
    { name: "아이엠뱅크", code: "003", logo: "/bankImg/아이엠뱅크로고.svg" },
    { name: "부산", code: "032", logo: "/bankImg/부산로고.svg" },
    { name: "전북", code: "037", logo: "/bankImg/전북로고.svg" },
    { name: "제주", code: "035", logo: "/bankImg/제주로고.svg" },
    { name: "저축", code: "050", logo: "/bankImg/저축로고.svg" },
    { name: "산림조합", code: "064", logo: "/bankImg/산림조합로고.svg" },
    { name: "새마을", code: "045", logo: "/bankImg/새마을로고.svg" },
    { name: "신협", code: "048", logo: "/bankImg/신협로고.svg" },
  ];

  useEffect(() => {
    // 클라이언트에서만 실행
    const urlParams = new URLSearchParams(window.location.search);
    const amountFromParams = urlParams.get("amount");
    setAmount(amountFromParams); // amount 상태를 업데이트

    axios
      .get("http://211.188.52.119:8080/api/mypage/bank-info", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setBankData(res.data.result);
      });
  }, []);

  const call = () => {
    const formData = new FormData();
    formData.append("changePoint", amount?.toString() ?? `${amount}`);
    formData.append("pointType", "add");
    axios.post("http://211.188.52.119:8080/api/point", formData, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  const handleCopy = () => {
    const textCopy = `${bankInfo?.name} ${bankData?.bankAccount}`;
    navigator.clipboard.writeText(textCopy).then(() => {
      alert("복사되었습니다!");
    });
  };

  const bankInfo = banks.find((bank) => bank.code === bankData?.bankCode);

  return (
    <div className={styles.content}>
      <BackHeader />
      <div className={styles.title}>
        <p>충전이 필요한 금액을</p>
        <p>이체 후 인증해 주세요.</p>
      </div>
      <div className={styles.bankname}>
        <span>{bankInfo?.name}</span>
        <span>{bankData?.bankAccount}</span>
        <div className={styles.copy} onClick={handleCopy}>
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
