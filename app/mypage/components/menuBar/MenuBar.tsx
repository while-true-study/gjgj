import React from "react";
import styles from "./MenuBar.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface menuBar {
  title: string; // title
  linkTo: string; // 링크
  register?: boolean; // 등록되있니
  login?: boolean; // 로그인 여부
}

const MenuBar = ({ title, linkTo, register, login = true }: menuBar) => {
  const router = useRouter();
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!login) {
      e.preventDefault(); // 링크 이동 방지
      alert("로그인이 필요한 서비스입니다.");
      router.push("login/loginMain");
    }
  };
  return (
    <div className={styles.content}>
      <div>
        <span>{title}</span>
        {register && <span className={styles.register}>미등록</span>}
      </div>

      <Link href={login ? linkTo : "#"} onClick={handleClick}>
        <button>
          <img src="/down.svg"></img>
        </button>
      </Link>
    </div>
  );
};

export default MenuBar;
