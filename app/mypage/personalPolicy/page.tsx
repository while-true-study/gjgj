import BackHeader from "@/app/components/backHeader/BackHeader";
import React from "react";
import styles from "./personalPolicy.module.css";

const page = () => {
  return (
    <>
      <div className={styles.content}>
        <BackHeader></BackHeader>
        <h2>개인정보 처리방침</h2>
      </div>
    </>
  );
};

export default page;
