import React from "react";
import styles from "./Notice.module.css";

interface noticeprops {
  text: string; // 텍스트
  time: string; // 어떻게 넘어오지?
}
// 안쓰는 컴포넌트 (알람)
const Notice = ({ text, time }: noticeprops) => {
  return (
    <div className={styles.body}>
      <div className={styles.realbody}>
        <p className={styles.text}>{text}</p>
        <p className={styles.time}>{time}</p>
      </div>
    </div>
  );
};

export default Notice;
