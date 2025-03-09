"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./BankSelector.module.css";
import Image from "next/image";

const banks = [
  { name: "KB국민", code: "004", logo: "/bankImg/국민로고.svg" },
  { name: "기업", code: "003", logo: "/bankImg/기업로고.svg" },
  { name: "농협", code: "011", logo: "/bankImg/농협로고.svg" },
  { name: "산업", code: "002", logo: "/bankImg/산업로고.svg" },
  { name: "수협", code: "007", logo: "/bankImg/수협로고.svg" },
  { name: "신한", code: "088", logo: "/bankImg/신한로고.svg" },
  { name: "우리", code: "020", logo: "/bankImg/우리로고.svg" },
  { name: "우체국", code: "071", logo: "/bankImg/우체국로고.svg" },
  { name: "하나", code: "081", logo: "/bankImg/하나로고.svg" },
  { name: "한국씨티", code: "027", logo: "/bankImg/한국씨티로고.svg" },
  { name: "SC제일", code: "023", logo: "/bankImg/SC제일로고.svg" },
  { name: "카카오뱅크", code: "090", logo: "/bankImg/카카오뱅크로고.svg" },
  { name: "케이뱅크", code: "089", logo: "/bankImg/케이뱅크로고.svg" },
  { name: "토스뱅크", code: "092", logo: "/bankImg/토스뱅크로고.svg" },
  { name: "경남", code: "039", logo: "/bankImg/경남로고.svg" },
  { name: "광주", code: "034", logo: "/bankImg/광주로고.svg" },
  { name: "아이엠뱅크", code: "003", logo: "/bankImg/아이엠뱅크로고.svg" },
  { name: "부산", code: "032", logo: "/bankImg/부산로고.svg" },
  { name: "전북", code: "037", logo: "/bankImg/전북로고.svg" },
  { name: "제주", code: "035", logo: "/bankImg/제주로고.svg" },
  { name: "저축", code: "050", logo: "/bankImg/저축로고.svg" },
  { name: "산림조합", code: "064", logo: "/bankImg/산림조합로고.svg" },
  { name: "새마을", code: "045", logo: "/bankImg/새마을로고.svg" },
  { name: "신협", code: "048", logo: "/bankImg/신협로고.svg" },
];

interface BankSelectorProps {
  onSelect: (bankCode: string) => void;
  onClose: () => void;
  selBankName: (bankName: string) => void;
}

const BankSelector: React.FC<BankSelectorProps> = ({
  onSelect,
  onClose,
  selBankName,
}) => {
  return (
    <div className="w-full h-full flex flex-col items-center z-50">
      <AnimatePresence>
        <motion.div
          className="absolute bottom-0 left-0 w-full bg-white p-6 rounded-t-lg shadow-lg z-50"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          {/* 닫기*/}
          <div className="flex justify-between items-center mb-4 z-50">
            <h2 className="text-lg font-bold">은행을 선택하세요</h2>
            <button onClick={onClose} className={styles.button}>
              ✖
            </button>
          </div>

          {/* 은행 리스트 */}
          <div className="grid grid-cols-3 gap-4 z-50">
            {banks.map((bank, index) => (
              <button
                key={index}
                onClick={() => {
                  onSelect(bank.code);
                  selBankName(bank.name);
                  onClose();
                }}
                className="flex flex-col items-center p-2 border rounded-md hover:bg-gray-100"
              >
                <Image
                  key={index}
                  src={bank.logo}
                  alt={bank.name}
                  width={40}
                  height={40}
                />
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
