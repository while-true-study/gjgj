import React from "react";
import BackHeader from "../components/backHeader/BackHeader";
import ContentTitleBar from "./components/ContentTitleBar/ContentTitleBar";
import ContentHostBar from "./components/ContentHostBar/ContentHostBar";
import styles from "./contentGuest.module.css";
import { Button } from "../components/button/button";
import ContentNavigation from "./components/ContentNavigation/ContentNavigation";

const page = () => {
  return (
    <>
      <BackHeader></BackHeader>
      <img
        src="/contentGuest/Dog.svg"
        alt="test 공모전 사진입니다."
        style={{ marginTop: "10px" }}
      />
      <div className={styles.content}>
        <ContentHostBar proNum={2} name="하나둘셋" dday={60}></ContentHostBar>
        <ContentTitleBar
          contentTitle="공모전 제목에 들어갈 내용 공모전 제목에 들어갈 내용 공모전 제목에"
          category="슬로건"
          posttime="5시간전"
          money={160000}
        ></ContentTitleBar>
        <hr className={styles.hrBar}></hr>
        <div className={styles.contestcontent}>
          <p>
            공모전 내용입니다.공모전 내용입니다.공모전 내용입니다.공모전
            내용입니다.공모전 내용입니다.공모전 내용입니다. <br></br>
            <br></br>
            공모전 내용입니다.공모전 내용입니다.공모전 내용입니다.공모전
            내용입니다.공모전 내용입니다.공모전 내용입니다.공모전 내용입니다.
          </p>
        </div>
        <div className={styles.contestcontent}>
          <p>
            댓글댓글댓글댓글댓글댓글댓글댓글댓글어떻게 만들어놔야할지 모르겠다
          </p>
        </div>
        <div className={styles.footer}>
          <Button label="출품하기"></Button>
          <ContentNavigation
            heart={5}
            comment={59}
            bookmark={3}
            share={16}
          ></ContentNavigation>
        </div>
      </div>
    </>
  );
};

export default page;
