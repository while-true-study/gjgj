import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { User } from "@/types";

const useUserGet = () => {
  const [data, setData] = useState<User[]>([]);
  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    axios
      .get("http://211.188.52.119:8080/api/point/userList", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setData(res.data.result.userAllList);
      });
  }, []);

  return { data };
};

export default useUserGet;
