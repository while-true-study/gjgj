"use client";

import React, { useState, useEffect, useLayoutEffect } from "react";
import styles from "./user.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useUserGet from "../hooks/useUserGet";
import axios from "axios";
import Cookies from "js-cookie";
import AdminModal from "../components/AdminModal/AdminModal";

const Page = () => {
  useLayoutEffect(() => {
    document.body.className = "";
    const wrapperDiv = document.body.querySelector("body > div");
    if (wrapperDiv) {
      wrapperDiv.replaceWith(...wrapperDiv.childNodes);
    }
  }, []);

  const accessToken = Cookies.get("accessToken");
  const router = useRouter();
  const { userAllList } = useUserGet();

  const [userId, setUserId] = useState(""); // 유저 아이디
  const [userName, setUserName] = useState(""); // 유저 이름
  const [bankName, setBankName] = useState(""); // 은행 이름
  const [bankAccount, setBankAccount] = useState(""); // 계좌
  const [cash, setCash] = useState<number>(0); // 보유 캐시
  const [note, setNote] = useState(""); // 비고
  const [realId, setRealId] = useState("");

  const [showModal, setShowModal] = useState<boolean>(false);
  const closeModal = () => {
    setShowModal(false);
  };

  const [showModal2, setShowModal2] = useState<boolean>(false);
  const closeModal2 = () => {
    setShowModal2(false);
  };

  const changeNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };

  const handleBackClick = () => {
    router.back();
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userIdFromURL = params.get("userId") || "";
    if (userIdFromURL) {
      setUserId(userIdFromURL);
      const userData = userAllList.find(
        (user) => user.userId.toString() === userIdFromURL
      );
      if (userData) {
        setRealId(userData.accountid);
        setUserName(userData.nameKo);
        setBankName(userData.bankName);
        setBankAccount(userData.bankAccount);
        setCash(userData.point);
      }
    }
  }, [userAllList]);

  const noteSave = () => {
    const formData = new FormData();

    formData.append("comment", note);
    formData.append("listType", "userAllList");
    formData.append("userId", userId);
    axios.post("http://211.188.52.119:8080/api/point/updateComment", formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  return (
    <div>
      <hr className={styles.hr}></hr>
      <div className="px-40 pt-16">
        <div className={styles.header}>
          <Image
            src="/back.svg"
            alt="뒤로가기"
            width={30}
            height={30}
            onClick={handleBackClick}
            className="cursor-pointer"
          />
          <span>User 관리</span>
        </div>
        <div className={styles.container}>
          <div className={styles.formGroup}>
            <label className={styles.label}>유저 아이디</label>
            <input
              type="text"
              className={styles.input}
              value={realId}
              readOnly
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>본명</label>
            <input
              type="text"
              className={styles.input}
              value={userName}
              readOnly
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>계좌 정보</label>
            <input
              type="text"
              className={styles.input}
              value={`${bankName}`}
              readOnly
            />
            <input
              type="text"
              className={`${styles.input} ml-3`}
              value={`${bankAccount}`}
              readOnly
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>보유 캐시</label>
            <input type="text" className={styles.input} value={cash} readOnly />
            <div className={styles.buttonGroup}>
              <button
                className={`${styles.button} ${styles.blue}`}
                onClick={() => setShowModal(true)}
              >
                캐시 충전하기
              </button>
              <button
                className={`${styles.button} ${styles.red}`}
                onClick={() => setShowModal2(true)}
              >
                캐시 차감하기
              </button>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>비고</label>
            <textarea
              className={styles.textinput}
              cols={70}
              onChange={changeNote}
              value={note}
            ></textarea>
            <button
              className={`${styles.button} ${styles.black}`}
              onClick={noteSave}
            >
              저장하기
            </button>
          </div>
        </div>
      </div>
      {showModal ? (
        <AdminModal
          placeholder="충전할 금액"
          title="캐시 충전하기"
          buttonLabel="충전하기"
          backLabel="돌아가기"
          type="add"
          setView={showModal}
          setClose={closeModal} // 왼쪽
          listtype="userAllList"
          userId={Number(userId)}
        ></AdminModal>
      ) : (
        ""
      )}
      {showModal2 ? (
        <AdminModal
          placeholder="차감할 금액"
          title="캐시 차감하기"
          buttonLabel="차감하기"
          backLabel="돌아가기"
          type="remove"
          setView={showModal2}
          setClose={closeModal2} // 왼쪽
          listtype="userAllList"
          userId={Number(userId)}
        ></AdminModal>
      ) : (
        ""
      )}
    </div>
  );
};

export default Page;
