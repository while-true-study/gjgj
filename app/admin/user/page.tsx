// "use client";

// import React, { useState, useLayoutEffect } from "react";
// import styles from "./user.module.css";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// const Page = () => {
//   const router = useRouter();
//   const [userId, setUserId] = useState(""); // 유저 아이디
//   const [userName, setUserName] = useState(""); // 유저 이름
//   const [bankName, setBankName] = useState(""); // 은행 이름
//   const [bankAccount, setBankAccount] = useState(""); // 계좌
//   const [cash, setCash] = useState(""); // 보유 캐시
//   const [note, setNote] = useState(""); // 비고

//   const handleBackClick = () => {
//     router.back();
//   };

//   useLayoutEffect(() => {
//     document.body.className = "";
//     const wrapperDiv = document.body.querySelector("body > div");
//     if (wrapperDiv) {
//       wrapperDiv.replaceWith(...wrapperDiv.childNodes);
//     }
//   }, []);

//   return (
//     <>
//       <hr className={styles.hr}></hr>
//       <div className="px-40 pt-16">
//         <div className={styles.header}>
//           <Image
//             src="/back.svg"
//             alt="뒤로가기"
//             width={30}
//             height={30}
//             onClick={handleBackClick}
//           />
//           <span>User 관리</span>
//         </div>

//         {/* ✅ 입력 폼 */}
//         <div className={styles.container}>
//           <div className={styles.formGroup}>
//             <label className={styles.label}>유저 아이디</label>
//             <input
//               type="text"
//               className={styles.input}
//               value={userId}
//               readOnly
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label className={styles.label}>본명</label>
//             <input
//               type="text"
//               className={styles.input}
//               value={userName}
//               readOnly
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label className={styles.label}>계좌 정보</label>
//             <input
//               type="text"
//               className={styles.input}
//               value={`${bankName}  ${bankAccount}`}
//               readOnly
//             />
//             <input
//               type="text"
//               className={`${styles.input} ml-3`}
//               value={`${bankName}  ${bankAccount}`}
//               readOnly
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label className={styles.label}>보유 캐시</label>
//             <input type="text" className={styles.input} value={cash} readOnly />
//             <div className={styles.buttonGroup}>
//               <button className={`${styles.button} ${styles.blue}`}>
//                 캐시 충전하기
//               </button>
//               <button className={`${styles.button} ${styles.red}`}>
//                 캐시 차감하기
//               </button>
//             </div>
//           </div>

//           <div className={styles.formGroup}>
//             <label className={styles.label}>비고</label>
//             <textarea className={styles.input} cols={70}></textarea>
//             <button className={`${styles.button} ${styles.black}`}>
//               저장하기
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Page;

import React from "react";

const Page = () => {
  return <div></div>;
};

export default Page;
