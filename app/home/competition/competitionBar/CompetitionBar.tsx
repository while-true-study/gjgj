import React from "react";
import styles from "./CompetitionBar.module.css";
import Image from "next/image";

interface props {
  category: number;
  nickName: string;
  title: string;
  goodCount: number;
  replyCount: number;
  goodChk: number;
}

const CompetitionBar = ({
  category,
  nickName,
  title,
  goodCount,
  replyCount,
  goodChk,
}: props) => {
  const categoryNames = [
    { categoryId: 1, categoryName: "슬로건" },
    { categoryId: 2, categoryName: "네이밍" },
    { categoryId: 3, categoryName: "포토샵" },
    { categoryId: 4, categoryName: "로고" },
    { categoryId: 5, categoryName: "아이디어" },
    { categoryId: 6, categoryName: "기타" },
  ];
  const categoryName = categoryNames.find(
    (item) => item.categoryId === category
  )?.categoryName;
  return (
    <div className={styles.content}>
      <div className={styles.headline}>
        <span className={`${styles.category} ${styles.font}`}>
          {categoryName}
        </span>
        <span className={`${styles.nickname} ${styles.font}`}>{nickName}</span>
      </div>
      <p className={styles.title}>{title}</p>
      <div className={styles.footer}>
        <Image
          src={
            goodChk === 0
              ? "/IngContests/noheart.svg"
              : "/IngContests/heart.svg"
          }
          alt="하트"
          width={24}
          height={24}
        ></Image>
        <span>{goodCount}</span>
        <Image
          src="/IngContests/coment.svg"
          alt="댓글"
          width={24}
          height={24}
        ></Image>
        <span>{replyCount}</span>
      </div>
    </div>
  );
};

export default CompetitionBar;
