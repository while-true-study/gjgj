// import { useState, useEffect } from "react";
// import axios from "axios";

// // Hook 반환 값의 타입을 정의
// type UseBoardPatchReturnType = {};

// const useBoardPatch = (
//   accessToken: string | undefined,
//   boardId: string | null,
//   replyId: number | null
// ): UseBoardPatchReturnType => {
//   useEffect(() => {
//     if (!boardId || !replyId || !accessToken) return;

//     axios
//       .patch(
//         `http://211.188.52.119:8080/api/board`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//           params: {
//             boardId: Number(boardId),
//             replyId: Number(replyId),
//           },
//         }
//       )
//       .then((res) => {
//         if (res.data.isSuccess) {
//           window.location.href = "/complete?complete=채택";
//         }
//       })
//       .catch(() => {
//         console.log("err");
//       });
//   }, []);

//   return {};
// };

// export default useBoardPatch;
