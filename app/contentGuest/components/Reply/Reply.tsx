"use client";
import React, { useState } from "react";
import styles from "./Reply.module.css";
import { ReplyImage, ReReply } from "@/types";
import ReReplyCom from "../ReReply/ReReply";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import Image from "next/image";
import Modal from "@/app/components/modal/Modal";

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
  itsme,
  openImageModal,
}: {
  reply: replyProps;
  onReplyClick?: (boardId: number, nickName: string) => void;
  onReplyClick2?: (boardId: number) => void;
  color?: number;
  boardId?: number;
  heartClick: () => void;
  itsme?: number;
  openImageModal?: (imageUrl: string) => void;
}) => {
  const router = useRouter();
  const accessToken = Cookies.get("accessToken");
  const [showModal, setShowModal] = useState<boolean>(false);

  const closeModal = () => {
    setShowModal(false);
  };
  const handleButtonClick = () => {
    if (!accessToken) {
      // router.push("/login/input");
      // alert("로그인이 필요한 서비스입니다.");
      setShowModal(true);
      return;
    }
    if (onReplyClick) {
      onReplyClick(reply.replyId, reply.nickName); // 없어짐 이제
    } else {
      window.location.href = `/contentGuest/replypage.html?boardId=${boardId}`;
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

  const imgDownload = async () => {
    try {
      const response = await axios.get(
        "http://211.188.52.119:8080/api/board/download",
        {
          params: {
            boardId: boardId,
            replyId: reply.replyId,
          },
          headers: { Authorization: `Bearer ${accessToken}` },
          responseType: "blob",
        }
      );

      const link = document.createElement("a");
      const url = window.URL.createObjectURL(new Blob([response.data]));
      link.href = url;
      link.setAttribute("download", "images.zip");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("파일 다운로드 실패:", error);
    }
  };

  return (
    <>
      <div
        onClick={handleButtonClick2}
        className={`${styles.content} ${color === 1 ? styles.sel : ""}`}
      >
        <div className={styles.imgBox}>
          <Image
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

          <p className={`${styles.nickName} ${styles.text}`}>
            {reply.nickName}
          </p>
          {/* && reply.accChk == 1 && itsme === 1 */}
          {reply.replyImages.length > 0 && reply.accChk == 1 && itsme === 1 && (
            <span className={styles.imgDownload} onClick={imgDownload}>
              이미지 저장
            </span>
          )}
          <div className={styles.imgBox2}>
            {reply.replyImages.length > 0 &&
              reply.replyImages.map((img, i) => {
                return (
                  <Image
                    className={styles.replyImg}
                    key={i}
                    src={`http://211.188.52.119:8080/potoUrl/${img.potoName}`}
                    alt="댓글이미지"
                    width={60}
                    height={45}
                    onClick={() =>
                      openImageModal?.(
                        `http://211.188.52.119:8080/potoUrl/${img.potoName}`
                      )
                    }
                  ></Image>
                );
              })}
          </div>
          <p className={`${styles.title} ${styles.text}`}>{reply.content}</p>
          <span onClick={handleButtonClick} className={styles.write}>
            답글쓰기
          </span>
        </div>
        <div className={styles.heartBox}>
          <Image
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
          ></Image>
          <span>{reply.goodCount}</span>
        </div>
      </div>
      <div className={styles.reReplyContainer}>
        {reply.reReplyList.map((reReply, index) => (
          <ReReplyCom key={index} reReply={reReply} heartClick={heartClick} />
        ))}
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
    </>
  );
};

export default ReplyCompo;
