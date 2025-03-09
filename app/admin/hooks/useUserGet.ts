import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { ApiResponse, User, PointTransaction } from "@/types";

const useUserGet = () => {
  const [userAllList, setUserAllList] = useState<User[]>([]);
  const [removePointUserList, setRemovePointUserList] = useState<
    PointTransaction[]
  >([]);
  const [addPointUserList, setAddPointUserList] = useState<PointTransaction[]>(
    []
  );

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");

    axios
      .get("http://211.188.52.119:8080/api/point/userList", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        const result: ApiResponse = res.data.result;
        setUserAllList(result.userAllList); // userAllList 저장
        setRemovePointUserList(result.removePointUserList); // removePointUserList 저장
        setAddPointUserList(result.addPointUserList);
      });
  }, []);

  return { userAllList, removePointUserList, addPointUserList };
};

export default useUserGet;
