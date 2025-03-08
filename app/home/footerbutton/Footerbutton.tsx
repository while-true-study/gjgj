import Image from "next/image";
import React from "react";
import styles from "./Footerbutton.module.css";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Footerbutton = () => {
  const accessToken = Cookies.get("accessToken");
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!accessToken) {
      e.preventDefault(); // 링크 이동 방지
      alert("로그인이 필요한 서비스입니다.");
      router.push("/login/loginMain");
    }
  };
  return (
    <div className="flex justify-end mr-5">
      <Link href="/contentHost" onClick={handleClick}>
        <div className={styles.button}>
          <Image src="/home/+.svg" alt="+버튼" width={20} height={20}></Image>
          <span>공모전 열기</span>
        </div>
      </Link>
    </div>
  );
};

export default Footerbutton;
