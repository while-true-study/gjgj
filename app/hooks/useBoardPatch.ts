import { useState, useEffect } from "react";
import axios from "axios";

// Hook 반환 값의 타입을 정의
type UseBoardPatchReturnType = {
  data: boolean | undefined; // 성공 여부가 true/false로 처리되므로 boolean 타입으로 지정
};

const useBoardPatch = (
  accessToken: string | undefined,
  boardId: string | null,
  replyId: number | null
): UseBoardPatchReturnType => {
  const [data, setData] = useState<boolean | undefined>(undefined); // 상태를 boolean으로 초기화

  useEffect(() => {
    if (!boardId || !replyId || !accessToken) return; // accessToken이 없을 경우도 처리

    axios
      .patch(
        `http://211.188.52.119:8080/api/board`,
        {}, // 바디 데이터가 없다면 빈 객체를 보냄
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            boardId: Number(boardId),
            replyId: Number(replyId),
          },
        }
      )
      .then((res) => {
        // 성공 여부가 boolean 타입으로 오지 않는 경우 `res.data.isSuccess`가 존재한다고 가정하고 처리
        setData(res.data.isSuccess ?? false); // isSuccess가 없으면 false로 설정
      })
      .catch(() => {
        console.log("err");
        setData(false); // 오류 발생 시 data를 false로 설정
      });
  }, [boardId, accessToken]);

  return { data }; // 반환값
};

export default useBoardPatch;
