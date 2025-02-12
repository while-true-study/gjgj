import BackHeader from "@/app/components/backHeader/BackHeader";
import Contest from "@/app/components/Contest/Contest";
import React from "react";
import styles from "./homeListAll.module.css";

const page = () => {
  return (
    <div className={styles.content}>
      <BackHeader></BackHeader>
      {Array(15)
        .fill(null)
        .map((_, id) => {
          return (
            <Contest
              organizer="주최자"
              Dday={4}
              Iloveit={false}
              loveit={5}
              comment={10}
              title="공모전이름이 나타나는 섹션"
            ></Contest>
          );
        })}
    </div>
  );
};

export default page;
