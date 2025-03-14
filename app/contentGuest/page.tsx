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
      accChk: 0,
    },
    replyList: [],
    boardImages: [],
  });
  const [naviState, setNaviState] = useState(false);
  const [viewRealModal, setViewRealModal] = useState(false);
  const RealModalHandle = () => {
    setViewRealModal(!viewRealModal);
  };

  const BoardPatch = () => {
    axios
      .patch(
        `http://211.188.52.119:8080/api/board`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            boardId: Number(boardId),
            replyId: Number(selReply),
          },
        }
      )
      .then((res) => {
        if (res.data.isSuccess) {
          window.location.href = "/complete.html?complete=채택";
        }
      });
  };

  const deleteBoard = () => {
    axios
      .delete("http://211.188.52.119:8080/api/board", {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          boardId: Number(boardId),
          userId: userId,
        },
      })
      .then((res) => {
        if (res.data.isSuccess) {
          window.location.href = "/complete.html?complete=취소";
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
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [viewModal, setViewModal] = useState(false);

  const ModalHandel = () => {
    setViewModal((prev) => !prev);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // 모달 열기
  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeImageModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const [showModal, setShowModal] = useState<boolean>(false);
  const closeModal = () => {
    setShowModal(false);
  };
  const openModal = () => {
    setShowModal(true);
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
              setClose={ModalHandel}
              onClick={deleteBoard}
            ></Modal>
          </>
        )}
      </div>
      <div
        className={`${styles.content} overflow-auto scrollbar-hide overflow-x-hidden`}
      >
        {contestData.boardImages.length > 0 && (
          <Slider {...sliderSettings}>
            {contestData.boardImages.map((image, index) => (
              <div
                key={image.potoName}
                className={styles.imgBox}
                onClick={() =>
                  openImageModal(
                    `http://211.188.52.119:8080/potoUrl/${image.potoName}`
                  )
                } // 이미지 클릭 이벤트 추가
                style={{ cursor: "pointer" }}
              >
                <img
                  src={`http://211.188.52.119:8080/potoUrl/${image.potoName}`}
                  alt={`이미지 ${index}`}
                  style={{
                    width: "100%",
                    height: "280px",
                    objectFit: "contain",
                    cursor: "pointer",
                  }}
                />
              </div>
            ))}
          </Slider>
        )}
        {isModalOpen && selectedImage && (
          <>
            <BackHeader></BackHeader>
            <div
              className={styles.modalOverlay}
              onClick={closeImageModal} // 배경 클릭 시 모달 닫기
            >
              <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className={styles.closeButton}
                  onClick={closeImageModal}
                >
                  ✖
                </button>
                <img
                  src={selectedImage}
                  alt="확대된 이미지"
                  className={styles.fullScreenImage}
                />
              </div>
            </div>
          </>
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
            categoryId={contestData.boardDetail.categoryId}
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
                heartClick={heartClick} // 상태 변환
                onReplyClick2={handleReplyClick}
                itsme={contestData.boardDetail.isWriter ?? 0}
                openImageModal={openImageModal}
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
        {contestData.boardDetail.accChk === 1 ? null : contestData.boardDetail
            .isWriter === 0 ? (
          <Link
            href={
              accessToken && boardId
                ? `/contentGuest/nowrite.html?boardId=${boardId}`
                : "#"
            }
            onClick={(e) => {
              if (!accessToken) {
                e.preventDefault(); // 기본 이동 방지
                alert("로그인이 필요한 서비스입니다.");
                window.location.href = "/login/input.html"; // 로그인 페이지로 이동
              }
            }}
          >
            <Button label="출품하기"></Button>
          </Link>
        ) : contestData.replyList.length <= 2 ? (
          <div className={styles.flexBox}>
            <span
              className={`${styles.cacnel} ${styles.button}`}
              onClick={ModalHandel}
            >
              취소하기
            </span>
            <span
              className={`${styles.sel} ${styles.button}`}
              onClick={RealModalHandle}
            >
              채택하기
            </span>
          </div>
        ) : (
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
          heart={contestData.boardDetail.goodCount}
          comment={contestData.boardDetail.replyCount} // totalReplies
          bookmark={contestData.boardDetail.scrapCount}
          naviChange={heartClick}
          setShowModal={openModal}
        ></ContentNavigation>
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

export default ContentGuest;
