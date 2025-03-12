"use client";

import React from "react";
import styles from "./Complete.module.css";
import Link from "next/link";
import { Button } from "../button/button";

interface complete {
  title: string | null;
  type?: number | null;
}

const Complete = ({ title, type }: complete) => {
  return (
    <div className={styles.content}>
      <div className={styles.body}>
        <img src="/check.svg" alt="" />
        <span>{title} 완료</span>
        {type === 1 ? (
          <div className={styles.marginbox}>
            <p>충전 요청이 완료되었습니다.</p>
            <p>1영업일 이내로 충전 금액이 반영됩니다.</p>
          </div>
        ) : type === 2 ? (
          <div className={styles.marginbox}>
            <p>인출 요청이 완료되었습니다.</p>
            <p>1영업일 이내로 인출 금액이 이체됩니다.</p>
          </div>
        ) : null}
      </div>
      <div>
        <Link href="/home">
          <Button label="홈으로"></Button>
        </Link>
      </div>
    </div>
  );
};

export default Complete;
