"use client";

import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface UpdateProfileProps {
  nickName: string;
  selectedProfile: string;
}

const useUpdateProfile = () => {
  const [data, setData] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = async ({
    nickName,
    selectedProfile,
  }: UpdateProfileProps) => {
    setError(null);

    try {
      const accessToken = Cookies.get("accessToken");
      const response = await axios.patch(
        "http://211.188.52.119:8080/api/mypage/ImgAndNickname",
        { nickName, imgUrl: selectedProfile },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      setError(null);
      setData(null);
      if (response.data.isSuccess) {
        window.location.href = "/complete.html?complete=프로필 저장";
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };
  return { updateProfile, data, error };
};

export default useUpdateProfile;
