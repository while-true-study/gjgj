import BackHeader from "@/app/components/backHeader/BackHeader";
import React from "react";
import Notice from "../Notice/Notice";

const Page = () => {
  return (
    // 알람 페이지 지금 구현 X
    <div className="p-5">
      <BackHeader></BackHeader>
      <div className="pt-5">
        <Notice
          text="다른 사용자가 회원님의 출품작을 좋아합니다."
          time="방금"
        ></Notice>
        <Notice
          text="다른 사용자가 회원님의 출품작을 좋아합니다."
          time="방금"
        ></Notice>
        <Notice
          text="다른 사용자가 회원님의 출품작에 댓글을 달았습니다. “이거 생각하지도 못 했는데 진짜 좋은 아이디어 뭐시기asdasdasd"
          time="방금"
        ></Notice>
        <Notice
          text="다른 사용자가 회원님의 출품작을 좋아합니다.asdasdasdasdasdasds"
          time="30분 전"
        ></Notice>
        <Notice
          text="다른 사용자가 회원님의 출품작을 좋아합니다."
          time="12년 전"
        ></Notice>
      </div>
    </div>
  );
};

export default Page;
