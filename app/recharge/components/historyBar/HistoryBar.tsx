import React from "react";
import styles from "./HistoryBar.module.css";

const HistoryBar = ({
  type,
  time,
  cash,
}: {
  type: string;
  time: string;
  cash: number;
}) => {
  return (
    <div className={styles.content}>
      <div>
        <p className={styles.type}>{type}</p>
        <p className={styles.time}>{time}</p>
      </div>
      <span
        className={`${styles.cash} ${
          type === "충전" ? styles.blue : styles.red
        }`}
      >
        {cash}캐시
      </span>
    </div>
  );
};

export default HistoryBar;
