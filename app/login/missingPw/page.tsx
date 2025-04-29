"use client";

import styles from "./missingPw.module.css";
import Input from "@/app/components/input/Input";
import BackHeader from "@/app/components/backHeader/BackHeader";
import { Button } from "@/app/components/button/button";
import { useState } from "react";
import api from "@/app/lib/api";
import Image from "next/image";

export default function MissingId() {
  const [email, setEmail] = useState("");
  const [verEmail, setVerEmail] = useState(""); // 인증번호
  const [verify, setVerify] = useState(false); // 인증확인
  const [msg, setMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const emailHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const verEmailHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerEmail(e.target.value);
  };
  const handleCertification = async () => {
    try {
      console.log("인증요청");
      const res = await api.post(`/api/emails`, { email }); // /api/proxy?url=${encodeURIComponent("https://211.188.52.119:8080/api/emails)"
      setMsg(res.data.result);
      setIsSuccess(res.data.isSuccess);
    } catch (error) {
      console.error("인증 요청 실패:", error);
    }
  };

  const handleOkay = async () => {
    try {
      const res = await api.post(`/api/emails/verify`, {
        // /api/proxy?url=${encodeURIComponent("https://211.188.52.119:8080/api/emails/verify")}
        accountId: email,
        authCode: verEmail,
      });
      setVerify(res.data.isSuccess);
    } catch (error) {
      console.error("인증 확인 실패:", error);
    }
  };

  const buttonClick = async () => {
    try {
      await api.post(`/api/emails/password`, { email });
    } catch (error) {
      console.error("비밀번호 전송 실패:", error);
    }
  };
  return (
    <div className={styles.container}>
      <BackHeader />
      <div className={styles.title}>
        <p>이메일로</p>
        <p>비밀번호 찾기</p>
      </div>
      <div className={styles.phoneNumber}>
        <Input
          label="이메일"
          type="email"
          id="text"
          name="Number"
          placeholder="이메일을 적어주세요"
          rightBox={
            <div className={styles.Reqcall} onClick={handleCertification}>
              <span>인증요청</span>
            </div>
          }
          onChange={emailHandle}
          value={email}
        />
        {isSuccess && <p className={styles.msg}>{msg}</p>}
      </div>
      <div className={styles.certification}>
        <Input
          label="인증번호"
          type="text"
          id="getNumber"
          name="getNumber"
          placeholder="이메일로 받은 인증번호를 적어주세요."
          rightBox={
            <div className={styles.Reqcall} onClick={handleOkay}>
              {verify && (
                <Image
                  className={styles.checkimg}
                  src="/smallcheck.svg"
                  alt="체크 이미지"
                  width={24}
                  height={24}
                ></Image>
              )}
              <span>확인</span>
            </div>
          }
          onChange={verEmailHandle}
          value={verEmail}
        />
      </div>
      <Button
        label="메일로 비밀번호 전송"
        className={styles.button}
        isActive={verify}
        onClick={buttonClick}
      />
    </div>
  );
}
