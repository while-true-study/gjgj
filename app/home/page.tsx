"use client";

import NavigationBar from "../components/NavigationBar/NavigationBar";
import TopBarHome from "../components/TopBarHome/TopBarHome";
import Footerbutton from "./footerbutton/Footerbutton";
import styles from "./home.module.css";
import IngContests from "./IngContests/IngContests";
import Inspiration from "./inspiration/inspiration";

export default function LoginMain() {
  return (
    <div className="relative w-[375px] h-[812px] bg-white shadow-lg rounded-lg overflow-hidden">
      <TopBarHome></TopBarHome>
      <div className={styles.content}>
        {/* overflow-auto h-[calc(100%-60px)] pb-20 mt-20 */}
        <IngContests></IngContests>
        <Inspiration></Inspiration>
        <Footerbutton></Footerbutton>
      </div>
      <NavigationBar state={1}></NavigationBar>
    </div>
  );
}
