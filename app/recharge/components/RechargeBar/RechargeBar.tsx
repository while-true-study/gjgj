import React from "react";
import styles from "./RechargeBar.module.css";

interface Recharge {
  cash: number;
  money: number;
  hot?: boolean;
  onClick: (money: number) => void;
}

const RechargeBar = ({ cash, money, hot, onClick }: Recharge) => {
  const fomatmoney = money.toLocaleString();
  return (
    <div className={`${styles.contentbar} ${hot ? styles.hot : ""}`}>
      <div className={styles.cash}>
        {cash}캐시 {hot && <img src="/Recharge/hot.svg"></img>}
      </div>
      <div onClick={() => onClick(money)} className={`${styles.money}`}>
        {fomatmoney}원
      </div>
    </div>
  );
};

export default RechargeBar;
