"use client";

import BackHeader from "@/app/components/backHeader/BackHeader";
import React, { useState } from "react";
import styles from "./nowrite.module.css";
import Input from "@/app/components/input/Input";
import Image from "next/image";
import BankSelector from "@/app/components/BankSelector/BankSelector";
import { Button } from "@/app/components/button/button";
import axios from "axios";
import Cookies from "js-cookie";

const Page = () => {
  const accessToken = Cookies.get("accessToken");
  const [accountNum, setAccountNum] = useState<string>("");
  const [selBank, setSelBank] = useState<string>("");
  const [bankName, setBankName] = useState<string>("");
  const [isBankSelectorOpen, setIsBankSelectorOpen] = useState(false); // 셀렉터 상태

  const changeAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountNum(e.target.value);
  };

  const saveClick = () => {
    axios
      .patch(
        "http://211.188.52.119:8080/api/mypage/bank-info",
        {
          bankCode: selBank,
          bankAccount: accountNum,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((res) => {
        if (res.data.isSuccess) {
          window.location.href = "/complete.html?complete=계좌등록";
        }
      });
  };

  return (
    <div className="p-5">
      <BackHeader />
      <p className={styles.title}>올바른 계좌를 등록해 주세요</p>
      <div className="mt-10">
        <Input
          type="text"
          label="은행"
          name="accountcc"
          id="ba"
          placeholder="은행을 선택해 주세요."
          value={bankName}
          rightBox={
            <Image
              onClick={() => setIsBankSelectorOpen(true)}
              className={styles.img}
              src="/bankImg/down.svg"
              alt="버튼"
              width={24}
              height={24}
            />
          }
        />
        <br />
        <Input
          type="text"
          label="계좌번호"
          name="account"
          id="ac"
          placeholder="계좌번호를 입력해 주세요."
          onChange={changeAccount}
          value={accountNum}
        />
        {isBankSelectorOpen && (
          <BankSelector
            onSelect={(bank) => setSelBank(bank)}
            onClose={() => setIsBankSelectorOpen(false)}
            selBankName={(bank) => setBankName(bank)}
          />
        )}
      </div>
      <div className={styles.footer}>
        <Button
          label="저장하기"
          className="font-semibold"
          onClick={saveClick}
        ></Button>
      </div>
    </div>
  );
};

export default Page;
