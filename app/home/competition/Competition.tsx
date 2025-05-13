"use client";
import React, { useRef, useState } from "react";
import styles from "./Competition.module.css";
import CompetitionBar from "./competitionBar/CompetitionBar";
import { HomeListItem } from "@/types";

// 프롭스 정의 (공모전 리스트 데이터, 좋아요 상태 변경 콜백)
interface CompetitionProps {
  competData: HomeListItem[];
  loveChange: () => void;
}
// 경쟁이 치열한 인기 공모전 페이지
const Competition = ({ competData, loveChange }: CompetitionProps) => {
  const containerRef = useRef<HTMLDivElement>(null); // 드래그할 컨테이너
  const [isDragging, setIsDragging] = useState(false); // 드래그 중인지 여부 State
  const [startX, setStartX] = useState(0); // 드래그 시작 위치 X
  const [scrollLeft, setScrollLeft] = useState(0); // 시작시 스크롤 위치

  // 마우스 드래그 시작시
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  // 마우스 드래그 중일때
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault(); // 텍스트 드래그 방지
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // 스크롤 민감도
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  // 드래그 종료
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className={styles.content}>
      <p className={styles.title}>경쟁이 치열한 인기 공모전🏆</p>
      {/* 카드 목록 */}
      <div
        ref={containerRef}
        className={`${styles.cardsContainer} overflow-auto scrollbar-hide`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
      >
        {/* competData가 배열이 아니거나 비어있으면 해당 메시지 표시하기 */}
        {Array.isArray(competData) && competData.length === 0 ? (
          <p>경쟁 중인 공모전이 없습니다.</p>
        ) : (
          // competData가 배열이고 데이터가 있을 때 map으로 뿌리기 (공모전 목록)
          competData?.map((i) => (
            <CompetitionBar
              Iloveit={i.goodChk}
              boardId={i.boardId}
              key={i.boardId} // key 추가
              category={i.categoryId}
              nickName={i.nickName}
              title={i.title}
              goodCount={i.goodCount}
              replyCount={i.replyCount}
              goodChk={i.goodChk}
              loveChange={loveChange}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Competition;
