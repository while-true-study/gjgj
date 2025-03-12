import { useEffect, useState } from "react";
import axios from "axios";
import { HomeListItem } from "@/types";
import Cookies from "js-cookie";

type UseBoardPatch = {
  data: HomeListItem[] | undefined;
};

const useCategoryBoard = (
  categoryId: string | null,
  listType: number | null,
  contestType: boolean | null
): UseBoardPatch => {
  const [data, setData] = useState<HomeListItem[] | undefined>(undefined);
  useEffect(() => {
    const userId = Cookies.get("userId"); // 쿠키에서 userId 가져오기
    const accessToken = Cookies.get("accessToken");
    if (categoryId) {
      axios
        .get("http://211.188.52.119:8080/api/board/categoryBoardList", {
          headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : "",
          },
          params: {
            categoryId: Number(categoryId) + 1,
            userId: userId,
            listType: listType, // 1마감 2 좋아요 3상금
          },
        })
        .then((res) => {
          setData(res.data.result);
        })
        .catch(() => {
          console.log("err");
        });
    }
  }, [categoryId, listType, contestType]);

  return { data }; // 기본적으로 빈 데이터를 반환
};

export default useCategoryBoard;
