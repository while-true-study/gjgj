"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./BankSelector.module.css";

const banks = [
  { name: "KB국민", logo: "/bankImg/국민로고.svg" },
  { name: "기업", logo: "/bankImg/기업로고.svg" },
  { name: "농협", logo: "/bankImg/농협로고.svg" },
  { name: "산업", logo: "/bankImg/산업로고.svg" },
  { name: "수협", logo: "/bankImg/수협로고.svg" },
  { name: "신한", logo: "/bankImg/신한로고.svg" },
  { name: "우리", logo: "/bankImg/우리로고.svg" },
  { name: "우체국", logo: "/bankImg/우체국로고.svg" },
  { name: "하나", logo: "/bankImg/하나로고.svg" },
  { name: "한국씨티", logo: "/bankImg/한국씨티로고.svg" },
  { name: "SC제일", logo: "/bankImg/SC제일로고.svg" },
  { name: "카카오뱅크", logo: "/bankImg/카카오뱅크로고.svg" },
  { name: "케이뱅크", logo: "/bankImg/케이뱅크로고.svg" },
  { name: "토스뱅크", logo: "/bankImg/토스뱅크로고.svg" },
  { name: "경남", logo: "/bankImg/경남로고.svg" },
  { name: "광주", logo: "/bankImg/광주로고.svg" },
  { name: "아이엠뱅크", logo: "/bankImg/아이엠뱅크로고.svg" },
  { name: "부산", logo: "/bankImg/부산로고.svg" },
  { name: "전북", logo: "/bankImg/전북로고.svg" },
  { name: "제주", logo: "/bankImg/제주로고.svg" },
  { name: "저축", logo: "/bankImg/저축로고.svg" },
  { name: "산림조합", logo: "/bankImg/산림조합로고.svg" },
  { name: "새마을", logo: "/bankImg/새마을로고.svg" },
  { name: "신협", logo: "/bankImg/신협로고.svg" },
];

interface BankSelectorProps {
  onSelect: (bankName: string) => void;
  onClose: () => void; // 모달 닫기 함수 추가
}

const BankSelector: React.FC<BankSelectorProps> = ({ onSelect, onClose }) => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      {/* 전체 영역을 클릭하면 모달이 열리도록 변경 */}

      {/* 모달 */}
      <AnimatePresence>
        <motion.div
          className="absolute bottom-0 left-0 w-full bg-white p-6 rounded-t-lg shadow-lg"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          {/* 제목 & 닫기 버튼 */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">은행을 선택하세요</h2>
            <button onClick={onClose} className={styles.button}>
              ✖
            </button>
          </div>

          {/* 은행 리스트 */}
          <div className="grid grid-cols-3 gap-4">
            {banks.map((bank, index) => (
              <button
                key={index}
                onClick={() => {
                  onSelect(bank.name);
                  onClose();
                }}
                className="flex flex-col items-center p-2 border rounded-md hover:bg-gray-100"
              >
                <img src={bank.logo} alt={bank.name} className="w-10 h-10" />
                <span className="text-sm">{bank.name}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default BankSelector;
