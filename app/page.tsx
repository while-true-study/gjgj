"use client";

import { Button } from "./components/button/button";
import NavigationBar from "./components/NavigationBar/NavigationBar";

export default function LoginMain() {
  return (
    <main>
      <h1 className="font-notoSans">페이지</h1>
      <p className="font-notoSansKR">페이지입니다.</p>
      <Button label={"활성화된 버튼"} />
      <hr />
      <Button label={"비활성화 버튼"} isActive={false} />
      <NavigationBar></NavigationBar>
    </main>
  );
}
