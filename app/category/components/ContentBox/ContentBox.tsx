"use client";

import React, { useState } from "react";
import styles from "./ContentBox.module.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import Modal from "@/app/components/modal/Modal";

interface contentBox {
  tag: string; // 카테고리
  name: string; // 주최자 이름
  dday: number; // dday
  title: string; // 공모전 이름
  loveit: number; // 하트 수
  comment: number; // 댓글 수
  boardId: number;
  iloveit: number; //  좋아요 여부 0이면 안함
  changeList: () => void;
}

const ContentBox = ({
  tag,
  name,
  dday,
  title,
  loveit,
  comment,
  boardId,
  iloveit,
  changeList,
}: contentBox) => {
  const router = useRouter();
  const accessToken = Cookies.get("accessToken");
  const detailClick = () => {
    router.push(`/contentGuest?boardId=${boardId}`);
  };

  const [showModal, setShowModal] = useState<boolean>(false);
  const closeModal = () => {
    setShowModal(false);
  };
  const heartClick = () => {
    if (!accessToken) {
      setShowModal(true);
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
        if (changeList) {
          changeList();
        }
      })
      .catch((err) => {
        console.error("실패", err);
      });
  };
  return (
    <div className={styles.outbox}>
      <div className={styles.firLine}>
        <span>
          <span>{tag}</span>
        </span>
        <span>{name}</span>
        <span className={dday <= 5 ? styles.red : ""}>D-{dday}</span>
      </div>
      <div className={styles.titleBox} onClick={detailClick}>
        <p>{title}</p>
      </div>
      <div className={styles.thiLine}>
        <span className={styles.Heart}>
          <img
            className="cursor-pointer"
            src={
              iloveit === 0
                ? "/IngContests/noHeart.svg"
                : "/IngContests/heart.svg"
            }
            alt="좋아요수"
            onClick={heartClick}
          ></img>
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
      {showModal ? (
        <Modal
          title="로그인이 필요한 서비스입니다"
          fircontent="계속하시려면 로그인 해주세요."
          buttonLabel="로그인"
          backLabel="돌아가기"
          setView={showModal}
          setClose={closeModal} // 왼쪽
          onClick={() => (window.location.href = "/login/loginMain.html")} // 오른쪽
        ></Modal>
      ) : (
        ""
      )}
    </div>
  );
};

export default ContentBox;
