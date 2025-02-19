"use client";
import React from "react";
import styles from "./ContentNavigation.module.css";

interface ContentNavi {
  heart: number;
  comment: number;
  bookmark: number;
  share: number;
}

const ContentNavigation = ({
  heart,
  comment,
  bookmark,
  share,
}: ContentNavi) => {
  const heartClick = () => {
    console.log("heartClick");
  };

  const commentClick = () => {
    console.log("commentClick");
  };
  const bookmarkClick = () => {
    console.log("bookmarkClick");
  };
  const shareClick = () => {
    console.log("shareClick");
  };

  return (
    <div className={styles.navigBox}>
      <div className={styles.heartbox} onClick={heartClick}>
        <img src="/IngContests/noheart.svg"></img>
        {heart}
      </div>
      <div className={styles.commentbox} onClick={commentClick}>
        <img src="/IngContests/coment.svg"></img>
        {comment}
      </div>
      <div className={styles.bookmarkbox} onClick={bookmarkClick}>
        <img src="/contentGuest/nobookmark.svg"></img>
        {bookmark}
      </div>
      <div className={styles.sharebox} onClick={shareClick}>
        <img src="/contentGuest/share.svg"></img>
        {share}
      </div>
    </div>
  );
};

export default ContentNavigation;
