"use client";

import BackHeader from "@/app/components/backHeader/BackHeader";
import React, { useEffect, useState } from "react";
import styles from "./noaccount.module.css";
import { Button } from "@/app/components/button/button";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";

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

const Page = () => {
  const accessToken = Cookies.get("accessToken");
  const [accState, setAccState] = useState<boolean>(false); // true면 있는거
  const [bankData, setBankData] = useState<{
    bankCode: string;
    bankAccount: string;
  } | null>(null);
  useEffect(() => {
    axios
      .get("http://211.188.52.119:8080/api/mypage/bank-info", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setAccState(res.data.isSuccess);
        setBankData(res.data.result);
      });
  }, []);

  const bankInfo = banks.find((bank) => bank.code === bankData?.bankCode);
  return (
    <div className="p-5">
      <BackHeader></BackHeader>
      <div className={styles.title}>
        <p>채택 시 상금을 수여할</p>
        <p>계좌번호를 입력해 주세요</p>
      </div>
      {accState ? (
        <div className={styles.bankBar}>
          <div className={styles.bank}>
            <Image
              src={bankInfo?.logo ?? "/default"}
              alt="은행이미지"
              width={40}
              height={40}
              className={styles.imgbox}
            ></Image>
            <span>{bankInfo?.name}</span>
          </div>
          <span className="flex-grow">{bankData?.bankAccount}</span>
          <span
            className={styles.edit}
            onClick={() => (window.location.href = "/mypage/nowrite.html")}
          >
            수정
          </span>
        </div>
      ) : (
        <Link href="/mypage/nowrite">
          <Button label="등록하기" className="font-semibold"></Button>
        </Link>
      )}
    </div>
  );
};

export default Page;
