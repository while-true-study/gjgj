"use client";

import React, { useEffect, useState } from "react";
import styles from "./homeListAll.module.css";
import BackHeader from "@/app/components/backHeader/BackHeader";
import Contest from "@/app/components/Contest/Contest";
import Cookies from "js-cookie";
import api from "@/app/lib/api";

interface HomeListItem {
  boardId: number;
  boardPrize: number;
  categoryName: string;
  categoryId: number;
  createdAt: string;
  endCount: number;
  goodChk: number;
  goodCount: number;
  nickName: string;
  replyCount: number;
  title: string;
}
// 진행중인 공모전에서 전체보기를 눌렀을시 나오는 페이지
const Page = () => {
  const [data, setData] = useState<HomeListItem[]>([]); // 전체 공모전을 받는 리스트
  // const accessToken = Cookies.get("accessToken");
  const userId = Cookies.get("userId"); // userId 확인
  const [pageState, setPageState] = useState<boolean>(false); // 좋아요 눌렀을 시 페이지 상태를 바꿔서 다시 get을 보내도록 하는 변수
  const chagePageState = () => {
    // PageState를 토글하는 함수
    setPageState(!pageState);
  };
  useEffect(() => {
    // 공모전 전체보기를 가져오는 API 요청
    const fetchData = async () => {
      try {
        const res = await api.get(`/api/board/home_list`, {
          params: {
            // list Type을 5로 보내는데 5일시 전체보기임
            listType: 5,
            userId: userId === undefined ? null : userId, // userId가 없으면 null로 보내고 있으면 userId로 보내기
          },
        });
        setData(res.data.result.homeList);
      } catch (err) {
        console.log("요청 실패", err);
      }
    };
    fetchData();
  }, [pageState]);

  return (
    <div className={styles.content}>
      <BackHeader></BackHeader>
      <div className={styles.contentBox}>
        {data.length > 0 ? ( // data가 뭐라도 있으면 뿌려주기
          data.map((i) => {
            return (
              <Contest
                boardId={i.boardId}
                category={i.categoryId}
                key={i.boardId}
                organizer={i.nickName}
                Dday={i.endCount}
                Iloveit={i.goodChk === 1}
                loveit={i.goodCount}
                comment={i.replyCount}
                title={i.title}
                loveChange={chagePageState}
              />
            );
          })
        ) : (
          <p>로딩중...</p> // 데이터가 없을 때 로딩 중 표시
        )}
      </div>
    </div>
  );
};

export default Page;
