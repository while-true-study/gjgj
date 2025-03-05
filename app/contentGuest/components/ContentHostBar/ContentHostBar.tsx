import React from "react";
import styles from "./ContentHostBar.module.css";

interface HostBar {
  name: string;
  dday: number;
  userImg: string;
}

const ContentHostBar = ({ name, dday, userImg }: HostBar) => {
  return (
    <div className={styles.main}>
      <div className={styles.profile}>
        {/* <img src={`/profile/profile${proNum}.svg`} alt="프로필"></img> */}
        <img src={`${userImg}`} alt="프로필 이미지"></img>
      </div>
      <div className={styles.name}>
        <span>{name}</span>
      </div>
      <div className={dday <= 5 ? styles.ddayred : styles.dday}>
        <span>D-{dday}</span>
      </div>
    </div>
  );
};

export default ContentHostBar;
