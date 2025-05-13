import Image from "next/image";
import React, { useState } from "react";
import styles from "./Footerbutton.module.css";
import Link from "next/link";
import Cookies from "js-cookie";
import Modal from "@/app/components/modal/Modal";

const Footerbutton = () => {
  const accessToken = Cookies.get("accessToken"); // Token확인하기
  const [showModal, setShowModal] = useState<boolean>(false); // 모달 관리 State임 처음에는 false
  const closeModal = () => {
    // 모달 닫기
    setShowModal(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!accessToken) {
      e.preventDefault(); // 이동 막기
      // alert("로그인이 필요한 서비스입니다.");
      // router.push("/login/loginMain.html");
      setShowModal(true);
    }
  };
  return (
    <div className="flex justify-end mr-5">
      <Link href="/contentHost.html" onClick={handleClick}>
        <div className={styles.button}>
          <Image src="/home/+.svg" alt="+버튼" width={20} height={20}></Image>
          <span className={styles.text}>공모전 열기</span>
        </div>
      </Link>
      {showModal ? ( // showModal이 true면 모달이 뜸
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
    </div>
  );
};

export default Footerbutton;
