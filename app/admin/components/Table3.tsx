"use client";

import useUserGet from "../hooks/useUserGet";

const Table3 = () => {
  const { removePointUserList } = useUserGet();

  const handleRowClick = (userId: number) => {
    window.location.href = `/admin/cash.html?pointId=${userId}`;
  };

  return (
    <div style={{ paddingLeft: "56px", paddingRight: "56px" }}>
      <p style={{ marginBottom: "20px", fontWeight: "600", fontSize: "24px" }}>
        인출
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
            <th style={{ width: "4%" }}>선택</th>
            <th style={{ width: "10%" }}>유저 아이디</th>
            <th style={{ width: "8%" }}>본명</th>
            <th style={{ width: "12%" }}>보유 캐시</th>
            <th style={{ width: "20%" }}>비고</th>
            <th style={{ width: "45%" }}>인출 요청</th>
          </tr>
        </thead>
        <tbody>
          {removePointUserList.map((row) => (
            <tr key={row.pointId} onClick={() => handleRowClick(row.pointId)}>
              <td
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "25px",
                }}
              >
                <input type="checkbox"></input>
              </td>
              <td>{row.member.accountid}</td>
              <td>{row.member.nameKo}</td>
              <td>{row.member.point}</td>
              <td>{row.comment}</td>
              <td>{row.changePoint}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table3;
