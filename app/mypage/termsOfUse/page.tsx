import BackHeader from "@/app/components/backHeader/BackHeader";
import React from "react";
import styles from "./termsOfUse.module.css";

const Page = () => {
  return (
    <>
      <div className={styles.content}>
        <BackHeader></BackHeader>
        <span>이용 약관</span>
        
      </div>
    </>
  );
};

export default Page;
