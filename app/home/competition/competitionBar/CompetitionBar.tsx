"use client";

import React, { useState } from "react";
import styles from "./CompetitionBar.module.css";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Modal from "@/app/components/modal/Modal";
import api from "@/app/lib/api";

// 프롭스로 받을 자료들
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

// 경쟁중인 공모전 컴포넌트 안에서 쓰기 위한 컴포넌트 (공모전 한 블록)
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
  const router = useRouter(); // 라우터 쓰기위한 선언
  const accessToken = Cookies.get("accessToken"); // Token받아오기
  const categoryNames = [
    // 카테고리 종류
    { categoryId: 1, categoryName: "슬로건" },
    { categoryId: 2, categoryName: "네이밍" },
    { categoryId: 3, categoryName: "포토샵" },
    { categoryId: 4, categoryName: "로고" },
    { categoryId: 5, categoryName: "아이디어" },
    { categoryId: 6, categoryName: "기타" },
  ];

  const [showModal, setShowModal] = useState<boolean>(false); // 모달 상태 State

  const [localLike, setLocalLike] = useState(Iloveit); // Optimistic UI를 위한 좋아요 State
  const closeModal = () => {
    // 모달 닫기 함수
    setShowModal(false);
  };
  const heratClick = async () => {
    //좋아요 클릭 시 함수
    // 로그인 여부 검사 확인
    if (!accessToken) {
      // router.push("/login/input");
      // alert("로그인이 필요한 서비스입니다.");
      setShowModal(true);
      return;
    }

    const nextLike = localLike ? 0 : 1; // nextLike 만약 localLike 1이면 0, 0이면 1 (반대)
    setLocalLike(nextLike); // UI먼저 바꿔줌 (반대로 like해주기)

    try {
      // 좋아요 API보내기
      await api.post(
        "/api/good",
        { objectId: boardId, type: "board", goodChk: Iloveit ? 1 : 0 },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      loveChange?.(); // 있으면 호출 없으면 안하기 ?.() (옵셔널 체이닝)
    } catch (err) {
      setLocalLike(localLike); // 만약 실패하면 다시 바꿔주기
      console.log("API 에러", err);
    }
  };

  const detailClick = () => {
    // 공모전 클릭시 공모전 페이지로 감
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
      <div className="h-full">
        <p onClick={detailClick} className={styles.title}>
          {title}
        </p>
      </div>
      <div className={styles.footer}>
        <Image
          onClick={heratClick}
          src={
            goodChk === 0
              ? "/IngContests/noHeart.svg"
              : "/IngContests/heart.svg"
          }
          alt="하트"
          width={24}
          height={24}
        ></Image>
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
      {showModal ? ( // showModal이 true면 Modal이 뜸
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
