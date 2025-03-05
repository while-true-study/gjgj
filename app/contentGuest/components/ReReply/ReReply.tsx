"use client";
import React from "react";
import styles from "./ReReply.module.css";
import { ReReply } from "@/types";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";

const ReReplyCom = ({
  reReply,
  heartClick,
}: {
  reReply: ReReply;
  heartClick: () => void;
}) => {
  const router = useRouter();
  const accessToken = Cookies.get("accessToken");
  const heartHandle = () => {
    if (!accessToken) {
      router.push("/login/input");
      alert("로그인이 필요한 서비스입니다.");
      return;
    }
    axios
      .post(
        "http://211.188.52.119:8080/api/good",
        {
          objectId: reReply.reReplyId,
          type: "reReply",
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      .then((res) => {
        console.log("좋아요 성공", res);
        if (heartClick) {
          heartClick();
        }
      })
      .catch((err) => {
        console.error("실패", err);
      });
  };
  return (
    <div className={styles.content}>
      <div className={styles.imgBox}>
        <img
          src="/profile/profile1.svg"
          alt="프로필 이미지"
          width={24}
          height={24}
        />
      </div>
      <div className={styles.textBox}>
        <p className={`${styles.nickName} ${styles.text}`}>
          {reReply.nickName}
        </p>
        <p className={`${styles.title} ${styles.text}`}>{reReply.content}</p>
      </div>
      <div className={styles.heartBox}>
        <img
          className="cursor-pointer"
          onClick={heartHandle}
          src={
            reReply.goodChk === 0
              ? "/IngContests/noHeart.svg"
              : "/IngContests/heart.svg"
          }
          alt="하트"
          width={24}
          height={24}
        ></img>
        <span>{reReply.goodCount}</span>
      </div>
    </div>
  );
};

export default ReReplyCom;
