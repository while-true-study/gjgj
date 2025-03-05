"use client";

import React, { useEffect, useState } from "react";
import styles from "./contentHost.module.css";
import BackHeader from "../components/backHeader/BackHeader";
import ContentHostBar from "./components/contentHostBar/ContentHostBar";
import { Button } from "../components/button/button";
import axios from "axios";
import CategoryBox from "./components/categoryBox/CategoryBox";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

interface Category {
  categoryId: number;
  categoryName: string;
}

const ContentHost = () => {
  const [title, setTitle] = useState<string>(""); // 제목
  const [selectedDate, setSelectedDate] = useState<string>(""); // end 날짜
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null); // 카테고리 선택
  const [cash, setCash] = useState<string>(""); // 상금
  const [content, setcontent] = useState<string>(""); // 공모전 내용
  const [images, setImages] = useState<string[]>([]); // 사진
  const [category, setCategory] = useState<Category[]>([]); // 카테고리 get한거

  const today = new Date();
  const formatToday = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(today)
    .replace(/\. /g, "-") // yyyy. mm. dd. → yyyy-mm-dd 변환
    .replace(/\.$/, ""); // 마지막 마침표 제거

  // const jsonData = {
  //   categoryId: selectedCategory,
  //   title: title,
  //   content: content,
  //   boardPrize: cash,
  //   endAt: endDate,
  //   boardFiles: images,
  // };
  const boradButtonClick = async () => {
    const accessToken = Cookies.get("accessToken");
    const formData = new FormData();

    formData.append("categoryId", String(selectedCategory || 0));
    formData.append("title", title);
    formData.append("content", content);
    formData.append("boardPrize", cash);
    formData.append(
      "endAt",
      selectedDate ? new Date(selectedDate).toISOString().slice(0, 19) : ""
    );
    const boardFilesArray = images.map((image) => image);
    formData.append("board_files", JSON.stringify(boardFilesArray));

    try {
      await axios
        .post("http://211.188.52.119:8080/api/board", formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Bearer
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => (window.location.href = "/complete?complete=주최"));
    } catch (err) {
      console.log("실패", err);
    }
  };

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    axios
      .get("http://211.188.52.119:8080/api/category", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setCategory(res.data.result);
      }); // http://211.188.52.119:8080/ 이걸로 변경
  }, []);

  const cashChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // 숫자 외의 문자는 제거
    setCash(value);
  };

  const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const contentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setcontent(e.target.value);
  };

  // const formattedCash = cash
  //   ? Intl.NumberFormat("ko-KR").format(Number(cash)) + "(캐시)"
  //   : "";

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files); // 선택된 파일
      if (selectedFiles.length + images.length > 5) {
        alert("최대 5개의 이미지만 업로드할 수 있습니다.");
        return;
      }
      const newImages = selectedFiles.map((file) => URL.createObjectURL(file)); // URL 변환
      setImages((prevImages) => [...prevImages, ...newImages]); // 추가
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index)); // 제거
  };

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate);
  };

  const buttonVal =
    title.trim() !== "" &&
    selectedDate !== "" &&
    selectedCategory !== null &&
    cash.trim() !== "" &&
    content.trim() !== "";

  return (
    <div className="p-5">
      <BackHeader></BackHeader>
      <form className={`${styles.content} mt-7`}>
        <ContentHostBar
          id="title"
          type="text"
          value={title}
          label="제목"
          placeholder="30자 이내의 제목을 입력해주세요."
          maxLength={30}
          onChange={titleChange}
        ></ContentHostBar>

        <div>
          <label className={styles.label}>주최 기간</label>
          <div className={styles.dateBox}>
            <span>{formatToday}</span>
            <span>~</span>
            <input
              id="dateInput"
              className={styles.dateInput}
              type="date"
              onChange={(e) => handleDateChange(e.target.value)} // 이 부분 추가
            ></input>
          </div>
        </div>
        <label className={styles.label}>카테고리</label>
        <div className={styles.categoryBox}>
          {category.map((item) => (
            <CategoryBox
              key={item.categoryId}
              title={item.categoryName}
              active={selectedCategory === item.categoryId}
              onClick={() => handleCategoryClick(item.categoryId)}
            ></CategoryBox>
          ))}
        </div>

        <ContentHostBar
          id="cash"
          type="text"
          value={cash}
          label="상금"
          placeholder="₩ 공모전 상금을 입력해주세요."
          onChange={cashChange}
        ></ContentHostBar>

        <ContentHostBar
          id="content"
          type="text"
          value={content}
          label="공모전 내용"
          placeholder="공모전 내용을 자유롭게 작성해보세요.&#13;&#13;&#13;&#13;ex)공모전 주최 배경, 목표"
          onChange2={contentChange}
        ></ContentHostBar>

        <div>
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
                  src={image}
                  alt={`preview ${index}`}
                  style={{ objectFit: "cover" }}
                />
                <button type="button" onClick={() => handleRemoveImage(index)}>
                  <img src="/contentHost/cancel.svg"></img>
                </button>
              </div>
            ))}
          </div>

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
        </div>
      </form>

      <Button
        label="주최하기"
        isActive={buttonVal}
        onClick={boradButtonClick}
        className="mt-8"
      ></Button>
    </div>
  );
};

export default ContentHost;
