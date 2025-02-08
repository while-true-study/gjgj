"use client";

import BackHeader from "@/app/components/backHeader/BackHeader";
import { Button } from "@/app/components/button/Button";
import Input from "@/app/components/input/Input";
import styles from "./signUp.module.css";

export default function LoginInput() {
  const ClickReqCall = () => {
    console.log("인증요청");
  };

  return (
    <div className="flex flex-col h-full p-6">
      <BackHeader></BackHeader>
      <div className="flex mr-auto items-center mt-8">
        <span className="text-1.5xl font-medium mr-2 text-fontcolor font-ef-aone">
          끄적끄적
        </span>
        <span className="text-2xl font-bold ">회원이 아니신가요?</span>
      </div>
      <p className="text-2xl font-bold mr-auto mb-14">1분이면 충분해요!</p>
      <form className="w-full h-full max-w-sm flex flex-col gap-4 items-end">
        <Input
          label="전화번호"
          type="tel"
          id="Number"
          name="Number"
          placeholder="전화번호를 적어주세요."
          rightBox={
            <div className={styles.Reqcall} onClick={ClickReqCall}>
              <span>인증요청</span>
            </div>
          }
          classname="mb-6"
        ></Input>
        <Input
          label="인증번호"
          type="text"
          id="getNumber"
          name="getNumber"
          placeholder="문자로 받은 인증번호를 적어주세요."
          rightBox={
            <div className={styles.Reqcall} onClick={ClickReqCall}>
              <span>확인</span>
            </div>
          }
          classname="mb-6"
        ></Input>
        <Input
          label="아이디"
          type="text"
          id="getNumber"
          name="getNumber"
          placeholder="이메일을 적어주세요."
          classname="mb-6"
        ></Input>
        <Input
          label="비밀번호"
          type="text"
          id="getNumber"
          name="getNumber"
          placeholder="비밀번호를 적어주세요."
          classname="mb-6"
        ></Input>
        <Input
          label="비밀번호 확인"
          type="text"
          id="getNumber"
          name="getNumber"
          placeholder="비밀번호를 다시 적어주세요."
        ></Input>
        <Button label="다음으로" isActive={false} className="mt-auto"></Button>
      </form>
    </div>
  );
}
