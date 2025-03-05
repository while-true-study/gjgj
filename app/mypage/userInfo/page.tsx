"use client";
import React, { useState } from "react";
import styles from "./userInfo.module.css";
import BackHeader from "@/app/components/backHeader/BackHeader";
import Input from "@/app/components/input/Input";
import { Button } from "@/app/components/button/button";
import Modal from "@/app/components/modal/Modal";
import axios from "axios";
import Complete from "@/app/components/Complete/Complete";
import Cookies from "js-cookie";

const Page = () => {
  const [nickName, setNickName] = useState<string>("");
  const [viewWithdraw, setViewWithdraw] = useState(false);
  const [viewComplete, setViewComplete] = useState(false);

  const nickNameHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };

  const setViewModal = () => {
    setViewWithdraw(!viewWithdraw);
  };

  const WithdrawButton = () => {
    const accessToken = Cookies.get("accessToken");
    axios.delete("http://211.188.52.119:8080/api/mypage/deleteMember", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    setViewComplete(true);
    setViewModal();
  };

  const logout = async () => {
    const accessToken = Cookies.get("accessToken");
    try {
      const response = await axios.post(
        "http://211.188.52.119:8080/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.data.isSuccess) {
        Cookies.remove("accessToken");
        console.log("로그아웃 성공: 쿠키 삭제 완료");
        alert("로그아웃 되었습니다.");
        window.location.href = "/home"; // 로그인 페이지 또는 메인 페이지로 이동
      }
    } catch (error) {
      console.log(error);
      alert("로그아웃 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      {viewComplete && <Complete title="탈퇴"></Complete>}
      <Modal
        title="끄적끄적을 떠나실 건가요?"
        fircontent="계정탈퇴 시 모든 개인정보가 삭제되며"
        seccontent="구매한 캐시는 환불되지 않습니다."
        buttonLabel="계속 이용하기"
        backLabel="탈퇴하기"
        setView={viewWithdraw}
        setClose={WithdrawButton} // 오른쪽버튼
        onClick={setViewModal} // 왼쪽버튼
      ></Modal>
      <div className={styles.content}>
        <BackHeader></BackHeader>
        <div className={styles.imgBox}></div>
        <Input
          maxLength={10}
          type="text"
          label="닉네임"
          name="nickname"
          id="nickname"
          onChange={nickNameHandle}
          rightBox={
            <div className={styles.rightBox}>
              <span>{nickName.length}/10</span>
            </div>
          }
        />
        <p className={styles.help}>10자리 이내,문자/숫자로 작성해주세요.</p>
        <Button label="저장하기"></Button>
        <div className={styles.footer}>
          <span className={`${styles.logout} ${styles.font}`} onClick={logout}>
            로그아웃
          </span>
          <span
            onClick={setViewModal}
            className={`${styles.signout} ${styles.font}`}
          >
            계정 탈퇴
          </span>
        </div>
      </div>
    </>
  );
};

export default Page;
