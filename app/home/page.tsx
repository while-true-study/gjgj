"use client";

import Slider from "react-slick";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import TopBarHome from "../components/TopBarHome/TopBarHome";
import Footerbutton from "./footerbutton/Footerbutton";
import styles from "./home.module.css";
import IngContests from "./IngContests/IngContests";
import Inspiration from "./inspiration/inspiration";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";
import Cookies from "js-cookie";
import Image from "next/image";

// 메인 페이지 화면임 (슬라이더, 영감, 경쟁 공모전 등)
export default function LoginMain() {
  const settings = {
    // 슬라이더 설정 (react-slick 라이브러리)
    dots: true, // 하단 dot
    infinite: true, // 무한 반복
    speed: 500, // 애니메이션 속도
    slidesToShow: 1, // 한 번에 한 개의 이미지만 표시
    slidesToScroll: 1, // 한 번에 한 개의 이미지씩 넘김
    // dotsClass: `${styles.customDots}`,
  };

  useEffect(() => {
    // URL에서 access_token 추출해서 쿠키에 저장 (7일)
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("access_token");
    if (code) {
      Cookies.set("accessToken", code, { expires: 7 });
    }
  });

  return (
    <div className="relative w-[375px] max-h-[812px] h-[90vh] min-h-[500px] bg-white shadow-lg rounded-lg overflow-hidden">
      <TopBarHome></TopBarHome>
      <div className={styles.content}>
        <div className="p-5">
          <Slider {...settings}>
            {" "}
            {/* 최상단 소개 슬라이더 (정적) */}
            <div>
              <Image
                src="/home/service.svg"
                alt="service 1"
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
                onClick={() =>
                  // 클릭시 창열기
                  window.open(
                    "https://tin-brace-281.notion.site/1b226dab439180d488c0e2c75ba12355",
                    "_blank"
                  )
                }
              />
            </div>
            <div>
              <Image
                src="/home/service2.svg"
                alt="service 2"
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
                onClick={() =>
                  // 클릭시 창열기
                  window.open(
                    "https://tin-brace-281.notion.site/1b226dab43918079af49ea88363bbf3e?pvs=4"
                  )
                }
              />
            </div>
          </Slider>{" "}
        </div>
        <IngContests></IngContests> {/* 진행중인 공모전 나타내는 컴포넌트 */}
        <Inspiration></Inspiration> {/* 영감수Zip 컴포넌트 (정적 컨텐츠) */}
        <Footerbutton></Footerbutton> {/* 공모전 열기 버튼 (앱솔루트 고정됨) */}
      </div>
      <NavigationBar state={1}></NavigationBar> {/* 하단 네비게이션 컴포넌트 */}
    </div>
  );
}
