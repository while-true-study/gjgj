"use client";

import React, { useState } from "react";
import styles from "./Contest.module.css";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Modal from "../modal/Modal";
import api from "@/app/lib/api";
import Image from "next/image";

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
}: // loveChange,
inputprops) => {
  const [isLiking, setIsLiking] = useState(false); // 요청 중 여부
  const [likeCount, setLikeCount] = useState(loveit); // 좋아요 수
  const [isLiked, setIsLiked] = useState(Iloveit); // 내가 누른 상태

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
    router.push(`/contentGuest.html?boardId=${boardId}`);
  };

  const [showModal, setShowModal] = useState<boolean>(false);
  const closeModal = () => {
    setShowModal(false);
  };

  const heartClick = async () => {
    if (isLiking) return; // 연결중이면 나가기 (PV연산같음)
    setIsLiking(true);

    if (!accessToken) {
      // router.push("/login/input");
      // alert("로그인이 필요한 서비스입니다.");
      setShowModal(true);
      setIsLiking(false); // 로그인 안되있으면 false로 하고 나가기
      return;
    }
    // optimistic update 방식
    const prevLiked = isLiked;
    const prevCount = likeCount;

    setIsLiked(!isLiked);
    setLikeCount((prev) => prev + (isLiked ? -1 : 1));

    try {
      await api.post(
        "/api/good",
        { objectId: boardId, type: "board" },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
    } catch (err) {
      console.error("좋아요 실패", err);
      setIsLiked(prevLiked);
      setLikeCount(prevCount);
    } finally {
      setIsLiking(false); // 다 끝나면 돌려놓기
    }
  };

  // api
  // .post(
  //   "/api/good",
  //   { objectId: boardId, type: "board" },
  //   { headers: { Authorization: `Bearer ${accessToken}` } }
  // )
  // .then((res) => {
  //   console.log("좋아요 성공", res);
  //   if (loveChange) {
  //     loveChange();
  //   }
  // })
  // .catch((err) => {
  //   console.error("실패", err);
  // });

  return (
    <div className={styles.content}>
      <div className={styles.leftBox}>
        <div className={styles.category}>
          <span className={styles.categoryBox}>{categoryName}</span>
          <span>{organizer}</span>
        </div>
        <div className={styles.titleBox} onClick={commentClick}>
          <div className={styles.titleBox1}>
            <span className={`${Dday <= 5 ? styles.red : ""}`}>
              {Dday > 0
                ? `D-${Dday}`
                : Dday === 0
                ? "D-day"
                : `D+${Math.abs(Dday)}`}
            </span>
          </div>
          <div className={styles.titleBox2}>
            <span>{title}</span>
          </div>
        </div>
      </div>
      <div className={styles.rightBox}>
        <div className={styles.Box}>
          {/* <img
            className="cursor-pointer"
            onClick={heartClick}
            src={
              Iloveit ? "/IngContests/heart.svg" : "/IngContests/noHeart.svg"
            }
            alt="하트"
          ></img> */}
          <Image
            className="cursor-pointer"
            onClick={heartClick}
            src={
              // Iloveit ? "/IngContests/heart.svg" : "/IngContests/noHeart.svg"
              isLiked ? "/IngContests/heart.svg" : "/IngContests/noHeart.svg"
            }
            alt="하트"
            width={24}
            height={24}
          ></Image>
        </div>
        <div className={styles.Box}>
          <span>{likeCount}</span>
        </div>
        <div className={styles.Box}>
          {/* <img
            onClick={commentClick}
            className="cursor-pointer"
            src="/IngContests/coment.svg"
            alt="댓글"
          ></img> */}
          <Image
            onClick={commentClick}
            className="cursor-pointer"
            src="/IngContests/coment.svg"
            alt="댓글"
            width={24}
            height={24}
          ></Image>
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
