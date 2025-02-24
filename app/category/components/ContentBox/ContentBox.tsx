import React from "react";
import styles from "./ContentBox.module.css";

interface contentBox {
  tag: string; // 카테고리
  name: string; // 주최자 이름
  dday: number; // dday
  title: string; // 공모전 이름
  loveit: number; // 하트 수
  comment: number; // 댓글 수
}

const ContentBox = ({
  tag,
  name,
  dday,
  title,
  loveit,
  comment,
}: contentBox) => {
  return (
    <div className={styles.outbox}>
      <div className={styles.firLine}>
        <span>
          <span>{tag}</span>
        </span>
        <span>{name}</span>
        <span>D-{dday}</span>
      </div>
      <div className={styles.titleBox}>
        <p>{title}</p>
      </div>
      <div className={styles.thiLine}>
        <span className={styles.Heart}>
          <img src="/IngContests/noHeart.svg"></img>
          <span>{loveit}</span>
        </span>
        <span className={styles.comment}>
          <img src="/IngContests/coment.svg"></img>
          <span>{comment}</span>
        </span>
      </div>
    </div>
  );
};

export default ContentBox;
