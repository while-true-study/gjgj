import BackHeader from "@/app/components/backHeader/BackHeader";
import React from "react";
import styles from "./personalPolicy.module.css";

const page = () => {
  return (
    <>
      <BackHeader></BackHeader>
      <div className={styles.content}>
        <span>개인정보 처리방침</span>
        <p>
          개인정보 처리방침개인정보 처리방침개인정보 처리방침개인정보
          처리방침개인정보 처리방침개인정보 처리방침개인정보 처리방침개인정보
          처리방침개인정보 처리방침개인정보 처리방침개인정보 처리방침개인정보
          처리방침개인정보 처리방침개인정보 처리방침개인정보 처리방침개인정보
          처리방침개인정보 처리방침개인정보 처리방침개인정보 처리방침개인정보
          처리방침개인정보 처리방침
        </p>
      </div>
    </>
  );
};

export default page;
