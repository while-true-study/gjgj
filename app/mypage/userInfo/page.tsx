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
import { AnimatePresence, motion } from "framer-motion";
import useUpdateProfile from "@/app/hooks/useUpdateProfile";

const Page = () => {
  const profileImage = [
    "https://kr.object.ncloudstorage.com/profile-img/basic/B9CBB4D7-18A0-49BC-84A1-E0D5EC1F8112.png",
    "https://kr.object.ncloudstorage.com/profile-img/basic/EEA39F71-0CA1-4FCA-A0DE-090EB3956767.png",
    "https://kr.object.ncloudstorage.com/profile-img/basic/9957A943-220E-4BF1-B319-F3BA8D122599.png",
    "https://kr.object.ncloudstorage.com/profile-img/basic/6C7CC82D-CA70-4894-968B-44A344A85C94.png",
  ];

  const [nickName, setNickName] = useState<string>("");
  const [viewWithdraw, setViewWithdraw] = useState(false);
  const [viewComplete, setViewComplete] = useState(false);
  const [showModal, setShowModal] = useState(false); // 프로필 선택 모달 상태
  const [selectedProfile, setSelectedProfile] = useState(profileImage[0]); // 선택한 프로필 이미지

  const nickNameHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };

  const setViewModal = () => {
    setViewWithdraw(!viewWithdraw);
  };

  const WithdrawButton = async () => {
    try {
      const accessToken = Cookies.get("accessToken");
      const res = await axios.delete(
        "http://211.188.52.119:8080/api/mypage/deleteMember",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (res.data.isSuccess) {
        window.location.href = "/complete.html?complete=탈퇴";
      }
      setViewComplete(true);
      setViewModal();
    } catch (error) {
      console.error("탈퇴 중 오류 발생", error);
      alert("탈퇴 처리 중 문제가 발생했습니다.");
    }
  };

  const logout = async () => {
    try {
      const accessToken = Cookies.get("accessToken");
      const response = await axios.post(
        "http://211.188.52.119:8080/api/logout",
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (response.data.isSuccess) {
        Cookies.remove("accessToken");
        alert("로그아웃 되었습니다.");
        window.location.href = "/home.html";
      }
    } catch (error) {
      console.error("로그아웃 중 오류 발생", error);
      alert("로그아웃 중 오류가 발생했습니다.");
    }
  };

  const handleProfileSelect = (index: number) => {
    setSelectedProfile(profileImage[index]);
  };
  const { updateProfile, error } = useUpdateProfile();

  const handleSubmit = () => {
    updateProfile({ nickName, selectedProfile });
  };

  return (
    <>
      {viewComplete && <Complete title="탈퇴" />}
      <Modal
        title="끄적끄적을 떠나실 건가요?"
        fircontent="계정탈퇴 시 모든 개인정보가 삭제되며"
        seccontent="구매한 캐시는 환불되지 않습니다."
        buttonLabel="계속 이용하기"
        backLabel="탈퇴하기"
        setView={viewWithdraw}
        setClose={WithdrawButton}
        onClick={setViewModal}
      />
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            />
            <motion.div
              className="absolute bottom-0 w-full max-w-md bg-white p-6 rounded-t-lg shadow-lg z-50"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
            >
              <button
                className={styles.closeButton}
                onClick={() => setShowModal(false)}
              >
                ✖
              </button>
              <p className={styles.modalTitle}>프로필 이미지를 선택해 주세요</p>
              <div className="grid grid-cols-2 gap-4 z-50 w-48 m-auto">
                {[
                  "/profile/profile1.svg",
                  "/profile/profile2.svg",
                  "/profile/profile3.svg",
                  "/profile/profile4.svg",
                ].map((profile, index) => {
                  const displayProfile =
                    selectedProfile === profileImage[index]
                      ? profile.replace(".svg", "selected.svg")
                      : profile;

                  return (
                    <motion.div
                      key={index}
                      className={styles.profileOption}
                      onClick={() => handleProfileSelect(index)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Image
                        src={displayProfile}
                        alt={`프로필 ${index + 1}`}
                        width={80}
                        height={80}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <div className={styles.content}>
        <BackHeader />
        <div className={styles.imgBox}>
          <div className="relative" onClick={() => setShowModal(true)}>
            <Image
              src={selectedProfile}
              alt="프로필 이미지"
              width={80}
              height={80}
            />
            <Image
              className={styles.edit}
              src="/mypage/edit.svg"
              alt="수정"
              width={32}
              height={32}
              onClick={() => setShowModal(true)}
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
          rightBox={<div className={styles.rightBox}>{nickName.length}/10</div>}
        />
        <p className={styles.help}>10자리 이내, 문자/숫자로 작성해주세요.</p>
        <p className={styles.errText}>{error}</p>
        <Button label="저장하기" onClick={handleSubmit} />
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
