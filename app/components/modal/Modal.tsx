"use client";
import React from "react";
import styles from "./Modal.module.css";

interface modal {
  title: string; // 제목
  fircontent: string; // modal 첫째줄
  seccontent?: string; // modal 둘째줄
  buttonLabel: string; // 이벤트 버튼 라벨
  backLabel: string; // 돌아가는 label
  setView: boolean; // 렌더할지말지
  setClose: (open: boolean) => void; // 닫기
  onClick: () => void; // 버튼 이벤트
}

const Modal = ({
  title,
  fircontent,
  seccontent,
  setView,
  setClose,
  buttonLabel,
  backLabel,
  onClick,
}: modal) => {
  if (!setView) return null;
  return (
    <div className={styles.backBox}>
      <div className={styles.mainBox}>
        <div className={styles.textBox}>
          <span className="text-base font-semibold pb-2">{title}</span>
          <p>{fircontent}</p>
          <p>{seccontent}</p>
        </div>
        <div className={styles.buttonBox}>
          <button className={styles.button} onClick={() => setClose(false)}>
            {backLabel}
          </button>
          <button className={styles.button} onClick={onClick}>
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
