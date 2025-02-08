"use client"

import BackHeader from "@/app/components/backHeader/BackHeader";
import Input from "@/app/components/input/Input"
import { Button } from "@/app/components/button/Button";
import styles from "./nickname.module.css"
import React, { useState } from "react";
import Image from "next/image";

export default function Nickname() {
    
    const [nickname, setNickname] = useState("");
    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.slice(0, 10); // 10자 초과 입력 방지
        setNickname(value);
    };

    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const handleImageClick = (imageNumber: number) => {
        setSelectedImage(imageNumber); // 선택한 이미지 번호 저장
    };

    const handleRegisterClick = () => {
        console.log("가입하기 버튼 클릭");
    }

    return (
        <div className={styles.container}>
            <BackHeader />
            <div className={styles.title}>
                <p>만나서 반가워요!</p>
                <p>활동할 이름을 알려주세요</p>
            </div>
            <form className={styles.nicknameInput}>
                <Input 
                    type="text"
                    label="닉네임"
                    name="nickname"
                    id="nickname"
                    onChange={handleNicknameChange}
                    rightBox={
                        <div className={styles.charCount}>                    
                            <span>
                                {nickname.length}/10
                            </span>
                        </div>
                    }
                />
                <p className={styles.warnMessage}>10자리 이내, 문자/숫자로 작성해주세요.</p>
            </form>
            
            <p className={styles.title2}>프로필 이미지</p>

            <div className={styles.profileImageContainer}>
                <div className={styles.imageContainer}>
                    {[1, 2, 3, 4].map((num) => {
                        const imageSrc = selectedImage === num ? `/profile/profile${num}selected.svg` : `/profile/profile${num}.svg`;

                        return (
                            <div 
                                key={num} 
                                className={`${styles.imageWrapper} ${selectedImage === num ? styles.selected : ""}`}
                                onClick={() => handleImageClick(num)}
                            >
                                <Image src={imageSrc} alt={`프로필 ${num}`} width={64} height={64} />
                            </div>
                        );
                    })}
                </div>
            </div>
            <Button label="가입하기" onClick={handleRegisterClick} className={styles.registerButton}/>
      </div>
    );
  }
  