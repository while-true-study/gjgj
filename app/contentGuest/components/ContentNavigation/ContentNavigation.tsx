"use client";

import React from "react";
import styles from "./ContentNavigation.module.css";
import Cookies from "js-cookie";
import axios from "axios";

interface ContentNavi {
  boardId: number;
  iloveit: number;
  heart: number;
  comment: number;
  bookmark: number;
  scrapChk: number;
  naviChange: () => void;
  setShowModal: () => void;
}

const ContentNavigation = ({
  boardId,
  iloveit,
  scrapChk,
  heart,
  comment,
  bookmark,
  naviChange,
  setShowModal,
}: ContentNavi) => {
  const accessToken = Cookies.get("accessToken");

  const heartClick = () => {
    if (!accessToken) {
      setShowModal();
      return;
    }
    axios
      .post(
        "http://211.188.52.119:8080/api/good",
        { objectId: boardId, type: "board" },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      .then((res) => {
        console.log("좋아요 성공", res);
        if (naviChange) {
          naviChange();
        }
      })
      .catch((err) => {
        console.error("실패", err);
      });
  };

  const commentClick = () => {
    if (!accessToken) {
      setShowModal();
      return;
    }
    window.location.href = `contentGuest/replypage.html?boardId=${boardId}`;
  };

  const bookmarkClick = () => {
    if (!accessToken) {
      setShowModal();
      return;
    }
    axios
      .post(
        "http://211.188.52.119:8080/api/scrap",
        { boardId: boardId, type: "board", scrapChk: scrapChk ? 1 : 0 },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      .then((res) => {
        console.log("북마크 성공", res);
        if (naviChange) {
          naviChange();
        }
      })
      .catch((err) => {
        console.error("실패", err);
      });
  };

  const shareClick = () => {
    const currentURL = window.location.href;
    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        alert("복사되었습니다!");
      })
      .catch((err) => {
        console.error("복사 실패:", err);
        alert("http 클립보드 접근이 차단되었습니다. 수동으로 복사해 주세요.");
      });
  };

  return (
    <div className={styles.navigBox}>
      <div className={styles.heartbox} onClick={heartClick}>
        <img
          className="cursor-pointer"
          src={
            iloveit === 1
              ? "/IngContests/heart.svg"
              : "/IngContests/noHeart.svg"
          }
        ></img>
        <span className={styles.text}>{heart}</span>
      </div>
      <div className={styles.commentbox} onClick={commentClick}>
        <img
          className="cursor-pointer"
          src="/IngContests/coment.svg"
          onClick={commentClick}
        ></img>
        <span className={styles.text}>{comment}</span>
      </div>
      <div className={styles.bookmarkbox} onClick={bookmarkClick}>
        <img
          className="cursor-pointer"
          src={
            scrapChk === 1
              ? "/contentGuest/bookmark.svg"
              : "/contentGuest/nobookmark.svg"
          }
        ></img>
        <span className={styles.bookmarkbox}>{bookmark}</span>
      </div>
      <div className={styles.sharebox} onClick={shareClick}>
        <img className="cursor-pointer" src="/contentGuest/share.svg"></img>
      </div>
    </div>
  );
};

export default ContentNavigation;
