import Contest from "@/app/components/Contest/Contest";
import React, { useState } from "react";
import styles from "./IngContests.module.css";

const IngContests = () => {
  const [testState, setTestState] = useState(1); // 전역 상태 관리 ?
  const allView = () => {
    console.log("전체보기");
  };
  return (
    <>
      <div className="head">
        <div className={styles.TopBox}>
          <span>진행 중인 공모전🚀</span>
          <span className="cursor-pointer" onClick={allView}>
            전체보기
          </span>
        </div>
        <div className={styles.sortbox}>
          <span className={testState === 1 ? styles.selBox : ""}>
            마감임박순
          </span>
          <span className={testState === 2 ? styles.selBox : ""}>좋아요순</span>
          <span className={testState === 3 ? styles.selBox : ""}>
            상금높은순
          </span>
        </div>
      </div>
      <div className="content">
        <Contest
          organizer="주최자"
          Dday={4}
          Iloveit={false}
          loveit={5}
          comment={10}
          title="공모전이름이 나타나는 섹션"
        ></Contest>
        <Contest
          organizer="주최자"
          Dday={88}
          Iloveit={true}
          loveit={5}
          comment={8}
          title="공모전 제목이 두 줄로 넘어갈 경우 화면"
        ></Contest>
        <Contest
          organizer="주최자"
          Dday={2}
          Iloveit={false}
          loveit={6}
          comment={0}
          title="공모전에 좋아요만 있는 경우"
        ></Contest>
        <Contest
          organizer="주최자"
          Dday={16}
          Iloveit={false}
          loveit={0}
          comment={3}
          title="공모전에 댓글만 있는 경우"
        ></Contest>
        <Contest
          organizer="주최자"
          Dday={4}
          Iloveit={false}
          loveit={0}
          comment={0}
          title="좋아요, 댓글 둘 다 없는 경우"
        ></Contest>
      </div>
    </>
  );
};

export default IngContests;
