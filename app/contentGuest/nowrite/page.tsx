"use client";

import BackHeader from "@/app/components/backHeader/BackHeader";
import React, { useEffect, useState } from "react";
import styles from "./nowrite.module.css";
import { Button } from "@/app/components/button/button";
import axios from "axios";
import Cookies from "js-cookie";

const Page = () => {
  const [exhibitContent, setExhibitContent] = useState<string>("");
  const [images, setImages] = useState<File[]>([]); // 사진
  const [boardIdFromParams, setBoardIdFromParams] = useState<string | null>(
    null
  );

  const accessToken = Cookies.get("accessToken");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const boardId = urlParams.get("boardId");
    setBoardIdFromParams(boardId); // boardId 상태 업데이트
  }, []);

  const exhibitHandle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setExhibitContent(e.target.value); // 콘텐츠 넣기
  };

  const exhibitButton = async () => {
    const formData = new FormData();
    formData.append("boardId", boardIdFromParams || "");
    formData.append("content", exhibitContent);
    images.forEach((file) => {
      formData.append("board_files", file);
    });
    try {
      await axios.post("http://211.188.52.119:8080/api/reply", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      window.location.href = "/complete?complete=출품";
    } catch (err) {
      console.log("실패", err);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files); // 선택된 파일
      if (selectedFiles.length + images.length > 5) {
        alert("최대 5개의 이미지만 업로드할 수 있습니다.");
        return;
      }
      setImages((prevImages) => [...prevImages, ...selectedFiles]); // 추가
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index)); // 제거
  };

  const buttonState = exhibitContent.trim() !== ""; // 버튼 상태

  return (
    <div className={styles.content}>
      <BackHeader></BackHeader>
      <p className={styles.title}>출품 내용</p>
      <textarea
        className={styles.exhibit}
        placeholder="공모전 출품 내용을 자유롭게 작성해보세요."
        onChange={exhibitHandle}
        value={exhibitContent}
      ></textarea>
      <div className="mt-6">
        <label className={styles.label} htmlFor="title">
          사진
        </label>
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "8px",
            flexWrap: "wrap",
          }}
        >
          <div className={styles.initBox}>
            <img src="/contentHost/camera2.svg"></img>
            <span>{images.length}/5</span>
          </div>
          {images.map((image, index) => (
            <div key={index} className={styles.imgBox}>
              <img
                src={URL.createObjectURL(image)}
                alt={`preview ${index}`}
                style={{ objectFit: "cover" }}
              />
              <button type="button" onClick={() => handleRemoveImage(index)}>
                <img src="/contentHost/cancel.svg"></img>
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.footer}>
        <label className={styles.inputButton}>
          <span className={styles.flexBox}>
            <img src="/contentHost/camera.svg"></img>
            <span>사진 업로드</span>
          </span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className={styles.imgInput}
          />
        </label>
        <Button
          onClick={exhibitButton}
          label="출품하기"
          className="mt-8"
          isActive={buttonState}
        ></Button>
      </div>
    </div>
  );
};

export default Page;
