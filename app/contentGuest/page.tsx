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

const ContentGuest = () => {
  const [boardId, setBoardId] = useState<string | null>(null);
  const accessToken = Cookies.get("accessToken");
  const [contestData, setContestData] = useState<BoardData>({
    boardDetail: {
      boardId: 0,
      title: "",
      content: "",
      nickName: "",
      userImg: null,
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
          params: { boardId: Number(boardIdFromParams) },
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          setContestData(res.data.result);
        });
    }
  }, [accessToken, naviState]);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="pl-5 pt-5">
        <BackHeader></BackHeader>
      </div>
      <div className={`${styles.content} overflow-auto scrollbar-hide`}>
        {contestData.boardImages.length > 0 && (
          <Slider {...sliderSettings}>
            {contestData.boardImages.slice(0, 5).map((image, index) => (
              <div key={index}>
                <img
                  src={`http://211.188.52.119:8080/potoUrl/${image.potoName}`}
                  alt={`이미지 ${index}`}
                  style={{ marginTop: "10px" }}
                />
              </div>
            ))}
          </Slider>
        )}
        <div className="p-5">
          <ContentHostBar
            proNum={2}
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
            <div key={i} className={`${styles.replyContainer}`}>
              <ReplyCompo
                reply={reply}
                boardId={contestData.boardDetail.boardId}
                heartClick={heartClick} // 상태 변환 함수
              />
            </div>
          ))
        ) : (
          <p>댓글이 없습니다.</p>
        )}
      </div>
      <div className={styles.footer}>
        {contestData.boardDetail.isWriter === 0 ? (
          <Link href={`/contentGuest/nowrite?boardId=${boardId}`}>
            <Button label="출품하기"></Button>
          </Link>
        ) : (
          <Link href={`/contentGuest/nowrite?boardId=${boardId}`}>
            <Button label="채택하기"></Button>
          </Link>
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
