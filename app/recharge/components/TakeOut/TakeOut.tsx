"use client";

import React, { useEffect, useState } from "react";
import styles from "./TakeOut.module.css";
import Cookies from "js-cookie";
import axios from "axios";
import Modal from "@/app/components/modal/Modal";

interface TakeOut {
  money: number;
}

const TakeOut = ({ money }: TakeOut) => {
  const [bankData, setBankData] = useState<{
    bankCode: string;
  } | null>(null);

  useEffect(() => {
    axios
      .get("http://211.188.52.119:8080/api/mypage/bank-info", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setBankData(res.data.result);
      });
  }, []);

  const accessToken = Cookies.get("accessToken");
  const [showModal, setShowModal] = useState<boolean>(false);
  const closeModal = () => {
    setShowModal(false);
  };

  const TakeOut = () => {
    const formData = new FormData();
    formData.append("changePoint", money?.toString() ?? `${money}`);
    formData.append("pointType", "remove");
    axios
      .post("http://211.188.52.119:8080/api/point", formData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        if (res.data.isSuccess) {
          window.location.href = "/complete.html?complete=인출 요청&type=2";
        }
      });
  };
  return (
    <div className={styles.content}>
      <div className={styles.cashline}>
        <span>보유캐시</span> <span>{money.toLocaleString()}</span>
      </div>
      <button
        className={`${styles.button} ${money > 0 ? styles.canTakeout : ""}`}
        onClick={() => {
          if (bankData?.bankCode === "000") {
            setShowModal(true);
          } else {
            TakeOut();
          }
        }}
      >
        인출 요청
      </button>
      {showModal ? (
        <Modal
          title="계좌번호 등록하기"
          fircontent="현금 이체를 위해"
          seccontent="계좌번호를 입력해주세요"
          buttonLabel="등록하기"
          backLabel="돌아가기"
          setView={showModal}
          setClose={closeModal} // 왼쪽
          onClick={() => (window.location.href = "/mypage/noaccount.html")} // 오른쪽
        ></Modal>
      ) : (
        ""
      )}
    </div>
  );
};

export default TakeOut;
