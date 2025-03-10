"use client";

import React, { useState } from "react";
import styles from "./CompetitionBar.module.css";
import Image from "next/image";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Modal from "@/app/components/modal/Modal";

interface props {
  category: number;
  nickName: string;
  title: string;
  goodCount: number;
  replyCount: number;
  goodChk: number;
  boardId: number;
  loveChange?: () => void;
  Iloveit: number;
}

const CompetitionBar = ({
  category,
  nickName,
  title,
  goodCount,
  replyCount,
  goodChk,
  boardId,
  Iloveit,
  loveChange,
}: props) => {
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
        { objectId: boardId, type: "board", goodChk: Iloveit ? 1 : 0 },
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

  const detailClick = () => {
    router.push(`/contentGuest?boardId=${boardId}`);
  };

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
      <p onClick={detailClick} className={styles.title}>
        {title}
      </p>
      <div className={styles.footer}>
        <img
          onClick={heratClick}
          src={
            goodChk === 0
              ? "/IngContests/noHeart.svg"
              : "/IngContests/heart.svg"
          }
          alt="하트"
        ></img>
        <span>{goodCount}</span>
        <Image
          onClick={detailClick}
          src="/IngContests/coment.svg"
          alt="댓글"
          width={24}
          height={24}
        ></Image>
        <span>{replyCount}</span>
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

export default CompetitionBar;
