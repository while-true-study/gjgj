// "use client";

// import React, { useEffect, useState } from "react";
// import styles from "./scrap.module.css";
// import axios from "axios";
// import BackHeader from "@/app/components/backHeader/BackHeader";
// // import Contest from "@/app/components/Contest/Contest";

// const Page = () => {
//   const [scrapData, setScrapData] = useState([]);
//   const [load, setLoad] = useState(true);
//   useEffect(() => {
//     axios.get("http://211.188.52.119:8080/api/mypage/scraplist").then((res) => {
//       console.log(res);
//       setScrapData(res.data.result);
//       setLoad(false);
//     });
//   });
//   return (
//     <div className={styles.content}>
//       <BackHeader></BackHeader>
//       {load ? (
//         <div>불러오는 중...</div>
//       ) : (
//         scrapData &&
//         scrapData.map((i) => {
//           return (
//             // <Contest
//             //   key={i.boardId}
//             //   organizer={i.nickName}
//             //   Dday={i.daysUntilEnd}
//             //   Iloveit={i.goodChk === 1 ? true : false}
//             //   loveit={i.goodsCount}
//             //   comment={i.replyCount}
//             //   title={i.title}
//             // ></Contest>
//             <p>ㄱ{ㄷ</p>
//           );
//         })
//       )}
//     </div>
//   );
// };

// export default Page;

import React from "react";

const Page = () => {
  return <div></div>;
};

export default Page;
