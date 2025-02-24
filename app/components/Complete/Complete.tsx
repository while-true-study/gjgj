"use client";

import React from "react";
import styles from "./Complete.module.css";
import Link from "next/link";
import { Button } from "../button/button";

interface complete {
  title: string;
}

const Complete = ({ title }: complete) => {
  return (
    <div className={styles.content}>
      <div className={styles.body}>
        <img src="/check.svg" alt="" />
        <span>{title} 완료</span>
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
