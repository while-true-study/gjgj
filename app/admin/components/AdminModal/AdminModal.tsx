"use client";

import React, { useState } from "react";
import styles from "./AdminModal.module.css";
import axios from "axios";
import Cookies from "js-cookie";

interface modal {
  title: string; // 제목
  buttonLabel: string; // 이벤트 버튼 라벨
  backLabel: string; // 돌아가는 label
  setView: boolean; // 렌더할지말지
  type: string;
  listtype: string;
  setClose: (open: boolean) => void; // 닫기
  userId: string;
  pointId?: string;
}

const AdminModal = ({
  title,
  setView,
  setClose,
  buttonLabel,
  backLabel,
  type,
  listtype,
  userId,
  pointId,
}: // chageAddCash,
modal) => {
  const [cash, setCash] = useState(0);
  const accessToken = Cookies.get("accessToken");

  const rechargeCash = () => {
    const formData = new FormData();

    formData.append("pointType", type);
    formData.append("changePoint", cash.toString());
    formData.append("listType", listtype);
    if (listtype !== "userAllList") {
      formData.append("pointId", pointId ?? "");
      formData.append("userId", userId);
    } else {
      formData.append("userId", userId);
    }
    axios
      .post(`http://211.188.52.119:8080/api/point/updatePoint`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Bearer 토큰 방식으로 추가
        },
      })
      .then(() => {
        window.location.href = "/admin.html";
      })
      .catch((error) => console.log(error));
  };

  if (!setView) return null;
  return (
    <div className={styles.backBox}>
      <div className={styles.mainBox}>
        <div className={styles.textBox}>
          <span className="text-base font-semibold pb-2">{title}</span>
        </div>
        <div className={styles.inputLine}>
          <label>충전할 금액</label>
          <input
            placeholder="충전할 금액"
            onChange={(e) => setCash(Number(e.target.value))}
          ></input>
        </div>
        <div className={styles.buttonBox}>
          <button className={styles.button} onClick={() => setClose(false)}>
            {backLabel}
          </button>
          <button className={styles.button} onClick={rechargeCash}>
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminModal;
