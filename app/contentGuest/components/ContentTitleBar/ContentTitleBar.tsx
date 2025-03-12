import React from "react";
import styles from "./ContentTitleBar.module.css";

interface TitleBar {
  contentTitle: string;
  category: string;
  categoryId: number;
  posttime: string;
  money: number;
}

const ContentTitleBar = ({
  contentTitle,
  category,
  categoryId,
  posttime,
  money,
}: TitleBar) => {
  const amount = money.toLocaleString();
  return (
    <div className={styles.gapbox}>
      <div className={styles.title}>
        <p>{contentTitle}</p>
      </div>
      <div className={styles.categoryBar}>
        <span
          className={`${styles.category} cursor-pointer`}
          onClick={() => {
            window.location.href = `/category.html?categoryId=${
              categoryId - 1
            }`;
          }}
        >
          {category}
        </span>
        <span className={styles.posttime}>{posttime}</span>
      </div>
      {/* date-fns dayjs/ */}
      <div className={styles.moneyBar}>
        <span className={styles.sangkum}>상금</span>
        <span className={styles.money}>{amount}원</span>
      </div>
    </div>
  );
};

export default ContentTitleBar;
