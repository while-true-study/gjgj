import BackHeader from "@/app/components/backHeader/BackHeader";
import React from "react";
import styles from "./personalPolicy.module.css";

const Page = () => {
  return (
    <>
      <div className={styles.content}>
        <BackHeader></BackHeader>
        <span>개인정보 처리방침</span>
        <p>
          스위프13팀(이하 “회사”라 한다)은 통신비밀보호법, 전기통신사업법,
          보통신망 이용촉진 및 정보보호 등에 관한 법률 등 정보통신서비스제
          공자가 준수하여야 할 관련 법령상의 개인정보보호 규정을 준수하며, 관련
          법령에 의거한 개인정보처리방침을 정하여 이용자 권익 보호에 최선을
          다하고 있습니다. 이에 개인정보보호법 제30조에 따라 정보주체의
          개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수
          있도록 하기 위하여 다음과 같이 개인정보처리방침을 수립,공개합니다.
        </p>
        <br></br>
        <ol type="1">
          <li className={styles.bold}>개인정보의 수집 및 이용목적</li>
          <li className={styles.bold}>수집하는 개인정보 항목 및 수집방법 </li>
          <li className={styles.bold}>개인정보의 제공 및 위탁 </li>
          <li className={styles.bold}>개인정보의 보유 및 이용기간 </li>
          <li className={styles.bold}>개인정보 파기절차 및 파기방법 </li>
          <li className={styles.bold}>이용자의 권리</li>
          <li className={styles.bold}>
            개인정보 자동 수집 장치의 설치, 운영 및 거부에 관한 사항
          </li>
          <li className={styles.bold}>개인정보의 기술적, 관리적 보호대책</li>
          <li className={styles.bold}>이용자의 권리와 그 행사방법</li>
          <li className={styles.bold}>개인정보에 관한 민원서비스</li>
          <li className={styles.bold}>기타 개인정보 처리에 관한 방침</li>
        </ol>
      </div>
    </>
  );
};

export default Page;
