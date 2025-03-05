"use client";

import React from "react";
import styles from "./ContentNavigation.module.css";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ContentNavi {
  boardId: number;
  iloveit: number;
  heart: number;
  comment: number;
  bookmark: number;
  scrapChk: number;
  naviChange: () => void;
}

const ContentNavigation = ({
  boardId,
  iloveit,
  scrapChk,
  heart,
  comment,
  bookmark,
  naviChange,
}: ContentNavi) => {
  const router = useRouter();
  const accessToken = Cookies.get("accessToken");

  const heartClick = () => {
    if (!accessToken) {
      router.push("/login/input");
      alert("로그인이 필요한 서비스입니다.");
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
    // 댓글 전체보기
    console.log("commentClick");
  };
  const bookmarkClick = () => {
    if (!accessToken) {
      router.push("/login/input");
      alert("로그인이 필요한 서비스입니다.");
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
    console.log("shareClick");
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
        {heart}
      </div>
      <div className={styles.commentbox} onClick={commentClick}>
        <Link href={`contentGuest/replypage?boardId=${boardId}`}>
          <img className="cursor-pointer" src="/IngContests/coment.svg"></img>
        </Link>
        {comment}
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
        {bookmark}
      </div>
      <div className={styles.sharebox} onClick={shareClick}>
        <img className="cursor-pointer" src="/contentGuest/share.svg"></img>
      </div>
    </div>
  );
};

export default ContentNavigation;
