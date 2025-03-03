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

export default function LoginMain() {
  const settings = {
    dots: true, // dots 표시
    infinite: true,
    speed: 500,
    slidesToShow: 1, // 한 번에 한 개의 이미지만 표시
    slidesToScroll: 1, // 한 번에 한 개의 이미지씩 넘김
    // dotsClass: `${styles.customDots}`, // customDots 클래스를 사용하여 위치 조정
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("access_token");
    if (code) {
      Cookies.set("accessToken", code, { expires: 7 });
    }
  });

  return (
    <div className="relative w-[375px] h-[812px] bg-white shadow-lg rounded-lg overflow-hidden">
      <TopBarHome></TopBarHome>
      <div className={styles.content}>
        <div className="p-5">
          <Slider {...settings}>
            <div>
              <img
                src="/home/service.svg"
                alt="service 1"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>
            <div>
              <img
                src="/home/service2.svg"
                alt="service 2"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>
          </Slider>
        </div>
        <IngContests></IngContests>
        <Inspiration></Inspiration>
        <Footerbutton></Footerbutton>
      </div>
      <NavigationBar state={1}></NavigationBar>
    </div>
  );
}
