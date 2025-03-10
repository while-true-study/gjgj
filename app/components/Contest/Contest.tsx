"use client";

import React, { useState } from "react";
import styles from "./Contest.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Modal from "../modal/Modal";

interface inputprops {
  boardId: number;
  organizer: string; // 주최자
  Dday: number; // D-day
  title: string; // 제목
  loveit: number; // 좋아요 수
  comment: number; //댓글수
  Iloveit: boolean; // 내 좋아요
  category: number;
  loveChange?: () => void;
}

const Contest = ({
  boardId,
  organizer,
  title,
  Dday,
  loveit,
  comment,
  Iloveit,
  category,
  loveChange,
}: inputprops) => {
  const router = useRouter();
  const accessToken = Cookies.get("accessToken");
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

  const commentClick = () => {
    router.push(`/contentGuest?boardId=${boardId}`);
  };

  const [showModal, setShowModal] = useState<boolean>(false);
  const closeModal = () => {
    setShowModal(false);
  };

  const heratClick = () => {
    if (!accessToken) {
      // router.push("/login/input");
      // alert("로그인이 필요한 서비스입니다.");
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
        if (loveChange) {
          loveChange();
        }
      })
      .catch((err) => {
        console.error("실패", err);
      });
  };

  return (
    <div className={styles.content}>
      <div className={styles.leftBox}>
        <div className={styles.category}>
          <span className={styles.categoryBox}>{categoryName}</span>
          <span>{organizer}</span>
        </div>
        <div className={styles.titleBox} onClick={commentClick}>
          <div className={styles.titleBox1}>
            <span className={`${Dday <= 5 ? styles.red : ""}`}>D-{Dday}</span>
          </div>
          <div className={styles.titleBox2}>
            <span>{title}</span>
          </div>
        </div>
      </div>
      <div className={styles.rightBox}>
        <div className={styles.Box}>
          <img
            className="cursor-pointer"
            onClick={heratClick}
            src={
              Iloveit ? "/IngContests/heart.svg" : "/IngContests/noHeart.svg"
            }
            alt="하트"
          ></img>
        </div>
        <div className={styles.Box}>
          <span>{loveit}</span>
        </div>
        <div className={styles.Box}>
          <img
            onClick={commentClick}
            className="cursor-pointer"
            src="/IngContests/coment.svg"
            alt="댓글"
          ></img>
        </div>
        <div className={styles.Box}>
          <span>{comment}</span>
        </div>
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

export default Contest;
