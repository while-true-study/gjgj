import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // 절대 URL 생성
    const { searchParams } = new URL(req.url, "http://localhost:3000");

    const listType = searchParams.get("listType");
    const userId = searchParams.get("userId");

    console.log("listType:", listType);
    console.log("userId:", userId);

    const mockData = {
      result: {
        homeList: [
          {
            boardId: 1,
            categoryId: 1,
            nickName: "디자인진흥원",
            endCount: 3,
            goodChk: 1,
            goodCount: 15,
            replyCount: 2,
            title: "청소년 슬로건 공모전",
          },
          {
            boardId: 4,
            categoryId: 3,
            nickName: "나는 바보다",
            endCount: 3,
            goodChk: 1,
            goodCount: 8,
            replyCount: 10,
            title: "사진 수정해주세요",
          },
          {
            boardId: 3,
            categoryId: 2,
            nickName: "갱얼지",
            endCount: 3,
            goodChk: 1,
            goodCount: 25,
            replyCount: 13,
            title: "저희 강아지 이름 추천해주세요",
          },
        ],
        competitionList: [
          {
            boardId: 2,
            categoryId: 4,
            nickName: "서울시청",
            endCount: 0,
            goodChk: 0,
            goodCount: 7,
            replyCount: 1,
            title: "로고 공모전",
          },
          {
            boardId: 1,
            categoryId: 1,
            nickName: "디자인진흥원",
            endCount: 3,
            goodChk: 1,
            goodCount: 15,
            replyCount: 2,
            title: "청소년 슬로건 공모전",
          },
          {
            boardId: 3,
            categoryId: 2,
            nickName: "갱얼지",
            endCount: 3,
            goodChk: 1,
            goodCount: 25,
            replyCount: 13,
            title: "저희 강아지 이름 추천해주세요",
          },
        ],
      },
    };

    return NextResponse.json(mockData);
  } catch (err) {
    console.error("❌ API 내부 오류:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
