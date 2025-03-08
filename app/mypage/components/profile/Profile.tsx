import React from "react";
import styles from "./Profile.module.css";
import Link from "next/link";
import Image from "next/image";

interface name {
  name: string;
  imgUrl: string;
}

const Profile = ({ name, imgUrl }: name) => {
  return (
    <div className={styles.content}>
      <div>
        <Image
          src={`${imgUrl}`}
          alt="프로필 이미지"
          width={80}
          height={80}
        ></Image>
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
