"use client";

import Contest from "../components/Contest/Contest";
import Input from "../components/input/Input";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import TopBarHome from "../components/TopBarHome/TopBarHome";
import styles from "./home.module.css";
import IngContests from "./IngContests/IngContests";

export default function LoginMain() {
  return (
    <div className="relative w-[375px] h-[812px] bg-white shadow-lg rounded-lg overflow-hidden">
      <TopBarHome></TopBarHome>
      <div className={styles.content}>
        {/* overflow-auto h-[calc(100%-60px)] pb-20 mt-20 */}
        <IngContests></IngContests>
      </div>
      <NavigationBar></NavigationBar>
    </div>
  );
}
