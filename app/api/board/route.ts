import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = [
      { categoryId: 1, categoryName: "슬로건" },
      { categoryId: 2, categoryName: "네이밍" },
      { categoryId: 3, categoryName: "포토샵" },
      { categoryId: 4, categoryName: "로고" },
      { categoryId: 5, categoryName: "아이디어" },
      { categoryId: 6, categoryName: "기타" },
    ];

    return NextResponse.json({
      isSuccess: true,
      code: "COMMON200",
      message: "성공입니다.",
      result: data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        isSuccess: false,
        code: "COMMON500",
        message: "서버 에러 발생",
        error: error,
      },
      { status: 500 }
    );
  }
}
