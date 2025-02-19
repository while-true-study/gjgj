import React from "react";
import styles from "./TakeOut.module.css";

interface TakeOut {
  money: number;
}

const TakeOut = ({ money }: TakeOut) => {
  const TakeOut = () => {
    console.log("TakeOut");
  };
  return (
    <div className={styles.content}>
      <div className={styles.cashline}>
        <span>보유캐시</span> <span>{money.toLocaleString()}</span>
      </div>
      <button
        className={`${styles.button} ${money > 0 ? styles.canTakeout : ""}`}
        onClick={TakeOut}
      >
        인출하기
      </button>
    </div>
  );
};

export default TakeOut;
