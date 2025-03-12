"use client";

import React, { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import styles from "./mypage.module.css";
import MenuBar from "./components/menuBar/MenuBar";
import Profile from "./components/profile/Profile";
import axios from "axios";
import Cookies from "js-cookie";
import Modal from "../components/modal/Modal";

interface mypage {
  point: number;
  nickName: string;
  imgUrl: string;
  resisterBank: boolean;
}

const Page = () => {
  const accessToken = Cookies.get("accessToken");
  const [mypageState, setMypageState] = useState(false); // 로그인 여부
  const [mypageData, setMypageData] = useState<mypage | null>(null);

  const [showModal, setShowModal] = useState<boolean>(false);
  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (!accessToken) {
      // 없으면
      setMypageState(false);
      console.log(mypageState);
      return;
    }
    axios
      .get("http://211.188.52.119:8080/api/mypage/profile", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setMypageState(true);
        setMypageData(res.data.result);
      });
  }, []);

  const loginClick = () => {
    window.location.href = "/login/loginMain.html";
  };
  return (
    <>
      <div className={`${styles.content} overflow-auto scrollbar-hide`}>
        <div>
          {mypageState ? (
            <Profile
              name={mypageData?.nickName || ""}
              imgUrl={mypageData?.imgUrl || ""}
            ></Profile>
          ) : (
            <button className={styles.loginbutton} onClick={loginClick}>
              로그인
            </button>
          )}
        </div>
        <div className={styles.cashBox}>
          <div className={styles.cashbar}>
            <span>보유캐시</span>
            <span>{mypageData?.point}</span>
          </div>
          <div className="mt-3">
            <button
              className={`${
                mypageData && mypageData?.point > 0 ? styles.charge : ""
              }`}
              onClick={() => {
                if (mypageState) {
                  window.location.href = "/recharge.html";
                } else {
                  setShowModal(true);
                }
              }}
            >
              충전하기
            </button>
          </div>
        </div>
        <div className={styles.menuBox}>
          <MenuBar
            title="주최한 공모전"
            linkTo="/mypage/host.html"
            login={mypageState}
            openModal={() => setShowModal(true)}
          ></MenuBar>
          <MenuBar
            title="출품한 공모전"
            linkTo="/mypage/guest.html"
            login={mypageState}
            openModal={() => setShowModal(true)}
          ></MenuBar>
          <MenuBar
            title="스크랩"
            linkTo="/mypage/scrap.html"
            login={mypageState}
            openModal={() => setShowModal(true)}
          ></MenuBar>
          <MenuBar
            title="계좌 관리"
            linkTo="/mypage/noaccount.html"
            register={!mypageData?.resisterBank}
            login={mypageState}
            openModal={() => setShowModal(true)}
          ></MenuBar>
          <MenuBar
            title="충전/인출"
            linkTo="/recharge.html"
            login={mypageState}
            openModal={() => setShowModal(true)}
          ></MenuBar>
          <MenuBar
            title="공지사항"
            linkTo="/"
            outLink="https://tin-brace-281.notion.site/1b226dab4391805297baf7ad9363bc03"
          ></MenuBar>
          <MenuBar
            title="고객센터"
            linkTo="/"
            outLink="https://open.kakao.com/o/sa7QBSgh"
          ></MenuBar>
          <MenuBar
            title="서비스 이용약관"
            linkTo="/mypage/termsOfUse.html"
          ></MenuBar>
          <MenuBar
            title="개인 처리 방침"
            linkTo="/mypage/personalPolicy.html"
          ></MenuBar>
        </div>
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
      <NavigationBar state={3}></NavigationBar>
    </>
  );
};

export default Page;
