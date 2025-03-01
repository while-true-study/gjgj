"use client";

import styles from "./missingPw.module.css";
import Input from "@/app/components/input/Input";
import BackHeader from "@/app/components/backHeader/BackHeader";
import { Button } from "@/app/components/button/button";
import { useState } from "react";
import axios from "axios";

export default function MissingId() {
  const [email, setEmail] = useState("");
  const [verEmail, setVerEmail] = useState(""); // 인증번호
  const [verify, setVerify] = useState(true); // 인증확인
  const [msg, setMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const emailHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const verEmailHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerEmail(e.target.value);
  };

  const handleCertification = () => {
    console.log("인증요청");
    axios
      .post(
        `/api/proxy?url=${encodeURIComponent(
          "https://211.188.52.119:8080/api/emails"
        )}`,
        { email }
      ) // http://211.188.52.119:8080/api/emails
      .then((res) => {
        setMsg(res.data.result);
        setIsSuccess(res.data.isSuccess);
      });
  };
  const handleOkay = () => {
    axios
      .post(
        `/api/proxy?url=${encodeURIComponent(
          "https://211.188.52.119:8080/api/emails/verify"
        )}`,
        {
          // http://211.188.52.119:8080/api/emails/verify
          accountId: email,
          authCode: verEmail,
        }
      )
      .then((res) => {
        setVerify(res.data.isSuccess);
      });
  };

  const buttonClick = () => {
    axios.post(`http://211.188.52.119:8080/api/emails/password`, { email });
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
                <img className={styles.checkimg} src="/smallcheck.svg" />
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
