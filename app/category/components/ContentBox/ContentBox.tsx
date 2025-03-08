import React from "react";
import styles from "./ContentBox.module.css";
import { useRouter } from "next/navigation";

interface contentBox {
  tag: string; // 카테고리
  name: string; // 주최자 이름
  dday: number; // dday
  title: string; // 공모전 이름
  loveit: number; // 하트 수
  comment: number; // 댓글 수
  boardId: number;
}

const ContentBox = ({
  tag,
  name,
  dday,
  title,
  loveit,
  comment,
  boardId,
}: contentBox) => {
  const router = useRouter();
  const detailClick = () => {
    router.push(`/contentGuest?boardId=${boardId}`);
  };
  return (
    <div className={styles.outbox}>
      <div className={styles.firLine}>
        <span>
          <span>{tag}</span>
        </span>
        <span>{name}</span>
        <span>D-{dday}</span>
      </div>
      <div className={styles.titleBox} onClick={detailClick}>
        <p>{title}</p>
      </div>
      <div className={styles.thiLine}>
        <span className={styles.Heart}>
          <img src="/IngContests/noHeart.svg" alt="좋아요수"></img>
          <span>{loveit}</span>
        </span>
        <span
          className={`${styles.comment} cursor-pointer`}
          onClick={detailClick}
        >
          <img src="/IngContests/coment.svg" alt="댓글수"></img>
          <span>{comment}</span>
        </span>
      </div>
    </div>
  );
};

export default ContentBox;
