"use client";

import React, { useEffect, useState } from "react";
import BackHeader from "../components/backHeader/BackHeader";
import ContentTitleBar from "./components/ContentTitleBar/ContentTitleBar";
import ContentHostBar from "./components/ContentHostBar/ContentHostBar";
import styles from "./contentGuest.module.css";
import { Button } from "../components/button/button";
import ContentNavigation from "./components/ContentNavigation/ContentNavigation";
import axios from "axios";
import Cookies from "js-cookie";
import { BoardData } from "@/types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import ReplyCompo from "./components/Reply/Reply";
import BackHeaderMore from "../components/backHeaderMore/BackHeaderMore";
import Modal from "../components/modal/Modal";
import useBoardPatch from "../hooks/useBoardPatch";

const ContentGuest = () => {
  const accessToken = Cookies.get("accessToken");
  const userId = Cookies.get("userId");
  const [boardId, setBoardId] = useState<string | null>(null);
  const [selReply, setSelReply] = useState<number>(0);
  const handleReplyClick = (boardId: number) => {
    setSelReply(boardId);
  };

  const [contestData, setContestData] = useState<BoardData>({
    boardDetail: {
      boardId: 0,
      title: "",
      content: "",
      nickName: "",
      userImg: "/profile/profile1.svg",
      categoryName: "",
      createdElapsed: "",
      goodCount: 0,
      scrapCount: 0,
      boardPrize: 0,
      endCount: 0,
      scrapChk: 0,
      goodChk: 0,
      categoryId: 1,
      deleteChk: 0,
      isWriter: 0, // 글쓴인가 아닌가
      replyCount: 0,
    },
    replyList: [],
    boardImages: [],
  });
  const [naviState, setNaviState] = useState(false);

  const [viewRealModal, setViewRealModal] = useState(false);
  const RealModalHandle = () => {
    setViewRealModal((prev) => !prev);
  };
  const { data } = useBoardPatch(accessToken, boardId, selReply);

  const BoardPatch = () => {
    if (data) {
      window.location.href = "/complete?complete=채택";
    }
  };

  const deleteBoard = () => {
    axios
      .delete("http://211.188.52.119:8080/api/board", {
        params: {
          boardId: Number(boardId),
          userId: userId,
        },
      })
      .then((res) => {
        if (res.data.isSuccess) {
          window.location.href = "/complete?complete=취소";
        }
      });
  };

  const heartClick = () => {
    setNaviState(!naviState);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const boardIdFromParams = urlParams.get("boardId");
    setBoardId(boardIdFromParams);
    if (boardIdFromParams) {
      axios
        .get("http://211.188.52.119:8080/api/board/detail", {
          params: { boardId: Number(boardIdFromParams), userId: userId },
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          setContestData(res.data.result);
        });
    }
  }, [accessToken, naviState]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [viewModal, setViewModal] = useState(false);

  const ModalHandel = () => {
    setViewModal((prev) => !prev);
  };

  return (
    <>
      <div className="px-5 pt-5">
        {contestData.boardDetail.isWriter === 0 ? (
          <BackHeader></BackHeader>
        ) : (
          <>
            <BackHeaderMore setViewModal={setViewModal}></BackHeaderMore>
            <Modal
              title="공모전 취소하기"
              fircontent="공모전 취소 시 예치금은"
              seccontent="100%로 환불됩니다."
              buttonLabel="취소하기"
              backLabel="돌아가기"
              setView={viewModal}
              setClose={ModalHandel} // 오른쪽버튼
              onClick={deleteBoard} // 왼쪽버튼
            ></Modal>
          </>
        )}
      </div>
      <div className={`${styles.content} overflow-auto scrollbar-hide`}>
        {contestData.boardImages.length > 0 && (
          <Slider {...sliderSettings}>
            {contestData.boardImages.map((image, index) => (
              <div key={index} className={styles.imgBox}>
                <img
                  src={`http://211.188.52.119:8080/potoUrl/${image.potoName}`}
                  alt={`이미지 ${index}`}
                  style={{
                    width: "100%",
                    height: "280px",
                    objectFit: "contain",
                  }}
                />
              </div>
            ))}
          </Slider>
        )}
        <div className="p-5">
          <ContentHostBar
            userImg={contestData.boardDetail.userImg ?? "/profile/profile1.svg"}
            name={contestData.boardDetail.nickName}
            dday={contestData.boardDetail.endCount}
          ></ContentHostBar>
          <ContentTitleBar
            contentTitle={contestData.boardDetail.title}
            category={contestData.boardDetail.categoryName}
            posttime={contestData.boardDetail.createdElapsed}
            money={contestData.boardDetail.boardPrize}
          ></ContentTitleBar>
          <hr className={styles.hrBar}></hr>
          <div className={styles.contestcontent}>
            <p>{contestData.boardDetail.content}</p>
          </div>
        </div>
        {contestData.replyList.length > 0 ? (
          contestData.replyList.map((reply, i) => (
            <div
              key={i}
              className={`${styles.replyContainer} ${
                selReply === reply.replyId ? styles.selBox : ""
              }`}
            >
              <ReplyCompo
                reply={reply}
                boardId={contestData.boardDetail.boardId}
                heartClick={heartClick} // 상태 변환 함수
                onReplyClick2={handleReplyClick}
              />
            </div>
          ))
        ) : (
          <p className="pl-5">댓글이 없습니다.</p>
        )}
      </div>
      {viewRealModal ? (
        <Modal
          title="채택 확정하기"
          fircontent="한 번 채택 시 취소가 불가합니다."
          seccontent="해당 댓글을 채택하시겠습니까?"
          buttonLabel="채택하기"
          backLabel="돌아가기"
          setView={viewRealModal}
          setClose={RealModalHandle} // 왼쪽
          onClick={BoardPatch} // 오른쪽
        ></Modal>
      ) : (
        <p></p>
      )}
      <div className={styles.footer}>
        {contestData.boardDetail.isWriter === 0 ? (
          <Link href={`/contentGuest/nowrite?boardId=${boardId}`}>
            <Button label="출품하기"></Button>
          </Link>
        ) : contestData.replyList.length <= 2 ? ( // 2개 이하면
          <div className={styles.flexBox}>
            <span className={`${styles.cacnel} ${styles.button}`}>
              취소하기
            </span>
            <span className={`${styles.sel} ${styles.button}`}>채택하기</span>
          </div>
        ) : (
          // 3개 이상
          <Button
            label="채택하기"
            onClick={RealModalHandle}
            isActive={selReply != 0}
          ></Button>
        )}
        <ContentNavigation
          scrapChk={contestData.boardDetail.scrapChk}
          boardId={contestData.boardDetail.boardId}
          iloveit={contestData.boardDetail.goodChk}
          heart={contestData.boardDetail.goodChk}
          comment={contestData.replyList.length}
          bookmark={contestData.boardDetail.scrapCount}
          naviChange={heartClick}
        ></ContentNavigation>
      </div>
    </>
  );
};

export default ContentGuest;
