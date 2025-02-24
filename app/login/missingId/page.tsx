"use client";

import styles from "./missingId.module.css";
import Input from "@/app/components/input/Input";
import BackHeader from "@/app/components/backHeader/BackHeader";
import { Button } from "@/app/components/button/button";

export default function MissingId() {
  const handleCertification = () => {
    console.log("인증요청");
  };
  const handleOkay = () => {
    console.log("확인");
  };

  return (
    <div className={styles.container}>
      <BackHeader />
      <div className={styles.title}>
        <p>가입한 번호로</p>
        <p>아이디 찾기</p>
      </div>
      <form className={styles.phoneNumber}>
        <Input
          label="전화번호"
          type="tel"
          id="Number"
          name="Number"
          placeholder="전화번호를 적어주세요."
          rightBox={
            <div className={styles.Reqcall} onClick={handleCertification}>
              <span>인증요청</span>
            </div>
          }
        />
      </form>
      <form className={styles.certification}>
        <Input
          label="인증번호"
          type="text"
          id="getNumber"
          name="getNumber"
          placeholder="문자로 받은 인증번호를 적어주세요."
          rightBox={
            <div className={styles.Reqcall} onClick={handleOkay}>
              <span>확인</span>
            </div>
          }
        />
      </form>
      <Button label="아이디 전송받기" className={styles.button} />
    </div>
  );
}
