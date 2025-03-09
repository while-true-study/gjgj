"use client";

import useUserGet from "../hooks/useUserGet";

const Table1 = () => {
  const { userAllList } = useUserGet();

  return (
    <div style={{ paddingLeft: "56px", paddingRight: "56px" }}>
      <p style={{ marginBottom: "20px", fontWeight: "600", fontSize: "24px" }}>
        회원
      </p>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#231F20",
              color: "#fff",
              textAlign: "left",
            }}
          >
            <th style={{ width: "25%" }}>유저 아이디</th>
            <th style={{ width: "8%" }}>본명</th>
            <th style={{ width: "12%" }}>보유 캐시</th>
            <th style={{ width: "45%" }}>비고</th>
          </tr>
        </thead>
        <tbody>
          {userAllList.map((row) => (
            <tr key={row.accountid}>
              <td>{row.accountid}</td>
              <td>{row.nameKo}</td>
              <td>{row.point}</td>
              <td>{row.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table1;
