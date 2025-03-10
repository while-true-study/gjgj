"use client";
import React from "react";
import styles from "./RechargeMenu.module.css";
import RechargeBar from "../RechargeBar/RechargeBar";
import {} from "next/router";
import { useRouter } from "next/navigation";

const RechargeMenu = () => {
  const router = useRouter();
  const RechargeHandle = (cash: number) => {
    router.push(`/Recharge/priceselect?amount=${cash}`);
  };

  return (
    <div className={styles.Menu}>
      <RechargeBar
        cash={1000}
        money={1000}
        onClick={() => RechargeHandle(1000)}
      ></RechargeBar>
      <RechargeBar
        cash={3000}
        money={3000}
        onClick={() => RechargeHandle(3000)}
      ></RechargeBar>
      <RechargeBar
        cash={5000}
        money={5000}
        hot={true}
        onClick={() => RechargeHandle(5000)}
      ></RechargeBar>
      <RechargeBar
        cash={10000}
        money={10000}
        onClick={() => RechargeHandle(10000)}
      ></RechargeBar>
    </div>
  );
};

export default RechargeMenu;
