import axios from "axios";

// 기본 서버 주소
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://211.188.52.119:8080", // env에 URL있으면 쓰고 아니면 오른쪽에 있는 주소로
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 쿠키 쓸 경우
});

export default instance;
