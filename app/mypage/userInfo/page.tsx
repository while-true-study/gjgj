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
import Image from "next/image";

const Page = () => {
  const [nickName, setNickName] = useState<string>("");
  const [viewWithdraw, setViewWithdraw] = useState(false);
  const [viewComplete, setViewComplete] = useState(false);
  const [showModal, setShowModal] = useState(false); // 프로필 선택 모달 상태
  const [selectedProfile, setSelectedProfile] = useState(
    "/profile/profile1.svg"
  ); // 선택한 프로필 이미지

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

  // 프로필 선택 핸들러
  const handleProfileSelect = (profile: string) => {
    setSelectedProfile(profile); // 선택한 프로필 업데이트
    setShowModal(false); // 모달 닫기
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

      {/* 프로필 선택 모달 */}
      {showModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowModal(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              onClick={() => setShowModal(false)}
            >
              ✖
            </button>
            <p className={styles.modalTitle}>프로필 이미지를 선택해 주세요</p>

            {/* 프로필 선택 목록 */}
            <div className={styles.profileOptions}>
              {[
                "/profile/profile1.svg",
                "/profile/profile2.svg",
                "/profile/profile3.svg",
              ].map((profile, index) => (
                <img
                  key={index}
                  src={profile}
                  alt={`프로필 ${index + 1}`}
                  className={styles.profileOption}
                  onClick={() => handleProfileSelect(profile)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className={styles.content}>
        <BackHeader></BackHeader>
        <div className={styles.imgBox}>
          <div className="relative" onClick={() => setShowModal(true)}>
            {" "}
            {/* 클릭 시 모달 열기 */}
            <Image
              src={selectedProfile} // 선택된 프로필 표시
              alt="기본프로필"
              height={80}
              width={80}
            />
            <Image
              className={styles.edit}
              src="/mypage/edit.svg"
              alt="수정"
              height={32}
              width={32}
            />
          </div>
        </div>
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
