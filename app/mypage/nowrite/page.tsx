"use client";

import BackHeader from "@/app/components/backHeader/BackHeader";
import React, { useState } from "react";
import styles from "./nowrite.module.css";
import Input from "@/app/components/input/Input";
import Image from "next/image";
import BankSelector from "@/app/components/BankSelector/BankSelector";

const Page = () => {
  const [accountNum, setAccountNum] = useState<string>("");
  const [selBank, setSelBank] = useState<string>("");
  const [isBankSelectorOpen, setIsBankSelectorOpen] = useState(false); // 셀렉터 상태

  const changeAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountNum(e.target.value);
  };

  return (
    <div className="p-5">
      <BackHeader />
      <p className={styles.title}>올바른 계좌를 등록해 주세요</p>

      <div className="mt-10">
        {/* 은행 선택 Input */}
        <Input
          type="text"
          label="은행"
          name="accountcc"
          id="ba"
          placeholder="은행을 선택해 주세요."
          value={selBank} // 선택된 은행이 반영됨
          rightBox={
            <Image
              onClick={() => setIsBankSelectorOpen(true)} // 클릭 시 BankSelector 열기
              className={styles.img}
              src="/bankImg/down.svg"
              alt="버튼"
              width={24}
              height={24}
            />
          }
        />

        <br />

        {/* 계좌번호 입력 Input */}
        <Input
          type="text"
          label="계좌번호"
          name="account"
          id="ac"
          placeholder="계좌번호를 입력해 주세요."
          onChange={changeAccount}
          value={accountNum}
        />

        {/* 은행 선택 모달 */}
        {isBankSelectorOpen && (
          <BankSelector
            onSelect={(bank) => setSelBank(bank)}
            onClose={() => setIsBankSelectorOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
