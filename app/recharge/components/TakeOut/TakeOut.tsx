import React from "react";
import styles from "./TakeOut.module.css";
import Cookies from "js-cookie";
import axios from "axios";

interface TakeOut {
  money: number;
}

const TakeOut = ({ money }: TakeOut) => {
  const accessToken = Cookies.get("accessToken");
  const TakeOut = () => {
    const formData = new FormData();
    formData.append("changePoint", money?.toString() ?? `${money}`);
    formData.append("pointType", "remove");
    axios
      .post("http://211.188.52.119:8080/api/point", formData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        if (res.data.isSuccess) {
          window.location.href = "/complete.html?complete=인출";
        }
      });
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
