import React from "react";
import styles from "./MenuBar.module.css";
import Link from "next/link";

interface menuBar {
  title: string; // title
  linkTo: string; // 내부 링크
  register?: boolean; // 등록 여부
  login?: boolean; // 로그인 여부
  openModal?: () => void;
  outLink?: string; // 외부 링크
}

const MenuBar = ({
  title,
  linkTo,
  register,
  login = true,
  openModal,
  outLink,
}: menuBar) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!login) {
      e.preventDefault(); // 링크 이동 방지
      if (openModal) {
        openModal();
      }
    }
  };

  return (
    <div className={styles.content}>
      <div>
        <span>{title}</span>
        {register && <span className={styles.register}>미등록</span>}
      </div>

      {outLink ? (
        // 외부 링크일 경우 a 태그 사용
        <a href={outLink} target="_blank" rel="noopener noreferrer">
          <button>
            <img src="/down.svg" alt="Go to external link" />
          </button>
        </a>
      ) : (
        // 내부 링크일 경우 Link 사용
        <Link href={login ? linkTo : "#"} onClick={handleClick}>
          <button>
            <img src="/down.svg" alt="Go to internal link" />
          </button>
        </Link>
      )}
    </div>
  );
};

export default MenuBar;
