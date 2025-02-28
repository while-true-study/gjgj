import React from "react";
import styles from "./Profile.module.css";
import Link from "next/link";

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
        <Link href="/mypage/userInfo">
          <span className={styles.edit}>계정설정</span>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
