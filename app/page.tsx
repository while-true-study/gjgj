"use client";

import { useState } from "react";
import Modal from "./components/modal/Modal";

export default function LoginMain() {
  const [modal, setModal] = useState(false);
  const testClick = () => {
    console.log("모달 클릭했다");
  };
  return (
    <main style={{ height: "100%" }}>
      <Modal
        title="캐시를 충전해주세요"
        fircontent="공모전 주최를 위한"
        seccontent="캐시가 부족합니다."
        setView={modal}
        setClose={setModal}
        buttonLabel="충전하기"
        backLabel="돌아가기"
        onClick={testClick}
      ></Modal>
      <button
        onClick={() => {
          setModal(true);
        }}
      >
        모달 보기
      </button>
    </main>
  );
}
