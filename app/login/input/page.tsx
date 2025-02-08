"use client";

import Input from "@/app/components/input/Input";
import { Button } from "@/app/components/button/button";

export default function LoginInput() {
  const findIdClcik = () => {
    console.log("아이디 찾기 버튼");
  };
  const findPwClcik = () => {
    console.log("비밀번호 찾기 버튼");
  };
  const sighUpClcik = () => {
    console.log("회원가입 버튼");
  };

  return (
    <div className="flex flex-col items-center h-full p-6">
      <p className="text-5xl font-normal mb-14">끄적끄적</p>
      <form className="w-full max-w-sm flex flex-col gap-4">
        <Input
          classname="mb-10"
          type="email"
          label="아이디"
          name="id"
          id="id"
        />
        <Input
          classname="mb-10"
          type="password"
          label="비밀번호"
          name="password"
          id="pw"
        />
        <Button label="로그인" isActive={false} className="mb-8"></Button>
      </form>
      <div className="flex items-center justify-center w-full">
        <div
          onClick={findIdClcik}
          className="flex items-center justify-center text-sm cursor-pointer border-r-2 border-gray-500 w-1/3 h-4"
        >
          <span>아이디 찾기</span>
        </div>
        <div
          onClick={findPwClcik}
          className="flex items-center justify-center text-sm cursor-pointer border-r-2 border-gray-500 w-1/3 h-4"
        >
          <span>비번 찾기</span>
        </div>
        <div
          onClick={sighUpClcik}
          className="items-center justify-center flex text-sm cursor-pointer w-1/3"
        >
          <span>회원가입</span>
        </div>
      </div>
    </div>
  );
}
