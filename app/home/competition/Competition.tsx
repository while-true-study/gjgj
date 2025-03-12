"use client";
import React, { useRef, useState } from "react";
import styles from "./Competition.module.css";
import CompetitionBar from "./competitionBar/CompetitionBar";
import { HomeListItem } from "@/types";

interface CompetitionProps {
  competData: HomeListItem[];
  loveChange: () => void;
}

const Competition = ({ competData, loveChange }: CompetitionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // 드래그 속도 조절
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className={styles.content}>
      <p className={styles.title}>경쟁이 치열한 인기 공모전🏆</p>
      <div
        ref={containerRef}
        className={`${styles.cardsContainer} overflow-auto scrollbar-hide`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
      >
        {/* competData가 배열이 아니거나 비어있으면 해당 메시지 표시 */}
        {Array.isArray(competData) && competData.length === 0 ? (
          <p>경쟁 중인 공모전이 없습니다.</p>
        ) : (
          // competData가 배열이고 데이터가 있을 때 map 실행
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
