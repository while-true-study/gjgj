import React from "react";
import styles from "./Profile.module.css";

interface name {
  name: string;
  profileNum: number;
}

const Profile = ({ name, profileNum }: name) => {
  return (
    <div className={styles.content}>
      <div>
        <img src={`/profile/profile${profileNum}.svg`}></img>
      </div>
      <div className={styles.rigth}>
        <span className={styles.name}>{name}님</span>
        <span className={styles.edit}>계정설정</span>
      </div>
    </div>
  );
};

export default Profile;
