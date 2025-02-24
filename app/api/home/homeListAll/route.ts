import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const listType = searchParams.get("listType");

  const homeList = [
    {
      boardId: 1,
      boardPrize: 50000, // 상금
      categoryName: "카테고리",
      createdAt: "2025-02-20T10:28:56.764848", // 생성 시간
      endCount: 1, // 마감일
      goodChk: 1, // 좋아요 헀는지
      goodCount: 2, // 좋아요 개수
      nickName: "테스터1", // 닉네임
      replyCount: 11, // 게시글 댓글 갯수
      title: "공모전이름이 나타나는 섹션", // 제목
    },
    {
      boardId: 2,
      boardPrize: 444,
      categoryName: "슬로건",
      createdAt: "2025-02-20T10:28:56.764848",
      endCount: 1,
      goodChk: 1,
      goodCount: 2,
      nickName: "테스터2",
      replyCount: 11,
      title: "좋아요,댓글, 둘다 없는경우",
    },
    {
      boardId: 3,
      boardPrize: 444,
      categoryName: "아이디어",
      createdAt: "2025-02-20T10:28:56.764848",
      endCount: 5,
      goodChk: 1,
      goodCount: 12,
      nickName: "테스터3",
      replyCount: 11,
      title: "공모전에 댓글만 있는 경우",
    },
    {
      boardId: 4,
      boardPrize: 50000, // 상금
      categoryName: "기타",
      createdAt: "2025-02-20T10:28:56.764848", // 생성 시간
      endCount: 20, // 마감일
      goodChk: 0,
      goodCount: 43,
      nickName: "테스터4",
      replyCount: 13,
      title: "공모전제목이 두줄로 넘어갈경우 화면화면화면",
    },
  ];

  // listType에 따라 데이터 필터링 (예시)
  const competitionList = listType === "4" ? [] : homeList;

  const responseData = {
    isSuccess: true,
    code: "COMMON200",
    message: "성공입니다.",
    result: homeList,
    competitionList: competitionList,
  };

  return NextResponse.json(responseData);
}
