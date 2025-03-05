"use client";
import React from "react";
import styles from "./Reply.module.css";
import { ReplyImage, ReReply } from "@/types";
import ReReplyCom from "../ReReply/ReReply";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";

interface replyProps {
  accChk: number; //(채택된 댓글인지 확인 0 : 채택안됨. 1 : 채택됨)
  content: string; //(댓글 본문)
  goodChk: number; //(로그인된 사용자가 좋아요 눌렀는지 확인 0 : 빈하트 , 1 : 빨간하트)
  goodCount: number; // (댓글의 좋아요 갯수)
  isWriter: number; // (로그인한 사용자가 쓴 댓글인지 확인     0 : 내가쓴게아님 , 1 : 내가쓴 댓글)
  nickName: string; // ( 댓글쓴 사람 닉네임)
  reReplyList: ReReply[]; //(대댓글 list)
  replyId: number; //(댓글id)
  replyImages: ReplyImage[]; //(댓글의 이미지 list, boardImages와 동일, 이미지불러오기 동일)
  userImg: string | null; // (댓글 쓴 사람 이미지, 어떻게 이미지 불러오는지는
}

const ReplyCompo = ({
  reply,
  onReplyClick,
  color = 0,
  boardId,
  heartClick,
  onReplyClick2,
}: {
  reply: replyProps;
  onReplyClick?: (boardId: number, nickName: string) => void;
  onReplyClick2?: (boardId: number) => void;
  color?: number;
  boardId?: number;
  heartClick: () => void;
}) => {
  const router = useRouter();
  const accessToken = Cookies.get("accessToken");

  const handleButtonClick = () => {
    if (onReplyClick) {
      // onReplyClick이 전달되었으면 해당 함수 실행
      onReplyClick(reply.replyId, reply.nickName);
    } else {
      // onReplyClick이 없다면 다른 작업 실행 (예: 페이지 이동)
      window.location.href = `/contentGuest/replypage?boardId=${boardId}`;
    }
  };

  const handleButtonClick2 = () => {
    if (onReplyClick2) {
      onReplyClick2(reply.replyId);
    }
  };

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
          objectId: reply.replyId,
          type: "reply",
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
    <>
      <div
        onClick={handleButtonClick2}
        className={`${styles.content} ${color === 1 ? styles.sel : ""}`}
      >
        <div className={styles.imgBox}>
          <img
            src={reply.userImg ?? "/profile/profile1.svg"}
            alt="프로필 이미지"
            width={24}
            height={24}
          />
        </div>
        <div className={styles.textBox}>
          {reply.accChk === 1 ? (
            <span className={styles.adopted}>채택</span>
          ) : null}
          {/* 여기에 이미지 넣어야함 */}
          <p className={`${styles.nickName} ${styles.text}`}>
            {reply.nickName}
          </p>
          <p className={`${styles.title} ${styles.text}`}>{reply.content}</p>
          <span onClick={handleButtonClick} className={styles.write}>
            답글쓰기
          </span>
        </div>
        <div className={styles.heartBox}>
          <img
            className="cursor-pointer"
            onClick={heartHandle}
            src={
              reply.goodChk === 0
                ? "/IngContests/noHeart.svg"
                : "/IngContests/heart.svg"
            }
            alt="하트"
            width={24}
            height={24}
          ></img>
          <span>{reply.goodChk}</span>
        </div>
      </div>
      <div className={styles.reReplyContainer}>
        {reply.reReplyList.map((reReply, index) => (
          <ReReplyCom key={index} reReply={reReply} heartClick={heartClick} />
        ))}
      </div>
    </>
  );
};

export default ReplyCompo;
