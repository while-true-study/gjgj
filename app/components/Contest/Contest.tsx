import React from "react";
import styles from "./Contest.module.css";

interface inputprops {
  organizer: string; // 주최자
  Dday: number; // D-day
  title: string; // 제목
  loveit: number; // 좋아요 수
  comment: number; //댓글수
  Iloveit: boolean; // 내 좋아요
  category: number;
}

const Contest = ({
  organizer,
  title,
  Dday,
  loveit,
  comment,
  Iloveit,
  category,
}: inputprops) => {
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
      <div className={styles.leftBox}>
        <div className={styles.category}>
          <span className={styles.categoryBox}>{categoryName}</span>
          <span>{organizer}</span>
        </div>
        <div className={styles.titleBox}>
          <div className={styles.titleBox1}>
            <span>D-{Dday}</span>
          </div>
          <div className={styles.titleBox2}>
            <span>{title}</span>
          </div>
        </div>
      </div>
      <div className={styles.rightBox}>
        <div className={styles.Box}>
          <img
            src={
              Iloveit ? "/IngContests/heart.svg" : "/IngContests/Noheart.svg"
            }
          ></img>
        </div>
        <div className={styles.Box}>
          <span>{loveit}</span>
        </div>
        <div className={styles.Box}>
          <img src="/IngContests/coment.svg"></img>
        </div>
        <div className={styles.Box}>
          <span>{comment}</span>
        </div>
      </div>
    </div>
  );
};

export default Contest;
