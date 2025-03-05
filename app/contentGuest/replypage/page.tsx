"use client";

import BackHeader from "@/app/components/backHeader/BackHeader";
import React, { useEffect, useState } from "react";
import styles from "./replypage.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import { Reply } from "@/types";
import ReplyCompo from "../components/Reply/Reply";

const Page = () => {
  // 대댓글만 하는 페이지
  const accessToken = Cookies.get("accessToken");
  const [replyData, setReplyData] = useState<Reply[]>([]);
  const [comment, setComment] = useState<string>("");
  const [replyId, setReplyId] = useState<number>(0); // 선택된 답글 ID
  const [nickName, setNickName] = useState<string>("");
  const [load, setLoad] = useState<boolean>(true);
  const [mainState, setMainState] = useState<boolean>(false);

  const ChangeState = () => {
    setMainState(!mainState);
  };

  const handleReplyClick = (boardId: number, nickName: string) => {
    setReplyId(boardId);
    setNickName(nickName);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const registerClick = async () => {
    const formData = new FormData();
    formData.append("replyId", replyId.toString());
    formData.append("content", comment);
    try {
      await axios.post("http://211.188.52.119:8080/api/reReply", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (err) {
      console.log("실패", err);
    }
  };

  // useEffect(() => { // replyId 받는거
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const boardIdFromParams = urlParams.get("replyId");
  //   setReplyId(Number(boardIdFromParams));
  // }, [replyId]);

  useEffect(() => {
    let isMounted = true;
    const urlParams = new URLSearchParams(window.location.search);
    const boardIdFromParams = urlParams.get("boardId");
    axios
      .get("http://211.188.52.119:8080/api/reply", {
        params: {
          boardId: Number(boardIdFromParams),
        },
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        if (isMounted) {
          setReplyData(res.data.result || []);
          setLoad(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [mainState]);
  return (
    <>
      <div className={`${styles.content} overflow-auto scrollbar-hide`}>
        <div className="pt-5 pl-5 pb-3">
          <BackHeader></BackHeader>
        </div>
        {load ? (
          <div className={`${styles.loader} pl-5`}>댓글 불러오는 중...</div> // 로딩 표시
        ) : replyData.length > 0 ? (
          replyData.map((reply, i) => (
            <div key={i} className={`${styles.replyContainer}`}>
              <ReplyCompo
                heartClick={ChangeState}
                reply={reply}
                onReplyClick={handleReplyClick}
                color={reply.replyId === replyId ? 1 : 0}
              />
            </div>
          ))
        ) : (
          <p className="pl-5">댓글이 없습니다.</p>
        )}
      </div>
      <div className={styles.footer}>
        <div className={styles.textBox}>
          <span className={styles.nickName}>@{nickName}</span>
          <textarea
            className={styles.inputStyle}
            placeholder="댓글을 입력해주세요"
            value={comment}
            onChange={handleCommentChange}
          ></textarea>
        </div>
        <span onClick={registerClick} className={styles.confirm}>
          등록
        </span>
      </div>
    </>
  );
};

export default Page;
