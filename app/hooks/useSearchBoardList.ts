import { HomeListItem } from "@/types";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const useSearchBoardList = (search: string | null, State: boolean) => {
  const [data, setData] = useState<HomeListItem[]>([]);
  const accessToken = Cookies.get("accessToken");
  const userId = Cookies.get("userId");

  useEffect(() => {
    axios
      .get("http://211.188.52.119:8080/api/board/serchBoardList", {
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
        params: {
          userId: userId,
          search: search,
        },
      })
      .then((res) => {
        setData(res.data.result);
      });
  }, [State]);

  return { data };
};

export default useSearchBoardList;
