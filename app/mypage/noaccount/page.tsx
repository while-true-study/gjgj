import BackHeader from "@/app/components/backHeader/BackHeader";
import React from "react";
import styles from "./noaccount.module.css";
import { Button } from "@/app/components/button/button";

const Page = () => {
  return (
    <div className="p-5">
      <BackHeader></BackHeader>
      <div className={styles.title}>
        <p>채택 시 상금을 수여할</p>
        <p>계좌번호를 입력해 주세요</p>
      </div>
      <Button label="등록하기"></Button>
    </div>
  );
};

export default Page;
