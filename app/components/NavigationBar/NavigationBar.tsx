"use client";
import React from "react";
import styles from "./NavigationBar.module.css";
import Link from "next/link";
import Image from "next/image";

interface crrstate {
  state: number;
}

const TAB = {
  HOME: 1,
  CATEGORY: 2,
  MYPAGE: 3,
} as const;

const tabs = [
  { id: TAB.HOME, href: "/home.html", name: "home", label: "홈" },
  {
    id: TAB.CATEGORY,
    href: "/category.html",
    name: "category",
    label: "카테고리",
  },
  { id: TAB.MYPAGE, href: "/mypage.html", name: "mypage", label: "마이페이지" },
];

const NavigationBar = ({ state }: crrstate) => {
  return (
    <div className={styles.footerBox}>
      <div className={styles.NaviBar}>
        {tabs.map((tab) => (
          <div key={tab.id} className={styles.NaviBox}>
            <Link href={tab.href}>
              <Image
                src={
                  state === tab.id
                    ? `/NavigationBar/sel${tab.name}.svg`
                    : `/NavigationBar/${tab.name}.svg`
                }
                alt={`${tab.label} 가기`}
                width={71}
                height={51}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavigationBar;
