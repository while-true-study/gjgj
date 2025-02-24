import BackHeader from "@/app/components/backHeader/BackHeader";
import React from "react";
import styles from "./termsOfUse.module.css";

const page = () => {
  return (
    <>
      <BackHeader></BackHeader>
      <div className={styles.content}>
        <span>이용 약관</span>
      </div>
    </>
  );
};

export default page;
