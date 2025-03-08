export interface HomeListItem {
  title: string;
  boardId: number;
  reply_id: number;
  goodChk: number;
  nickName: string;
  boardPrize: number;
  createdAt: string;
  endCount: number;
  goodsCount: number;
  goodCount: number;
  replyCount: number;
  categoryName: string;
  category: number;
  categoryId: number;
  daysUntilEnd: number;
}

// 댓글 이미지
export interface ReplyImage {
  createdAt: string;
  objectId: number; // 이미지의 boardId or replyId type에 따라 다름
  potoId: number; // 이미지 ID
  potoName: string; // 서버에 저장된 이미지 파일 이름
  potoOrigin: string; // 사용자 원본 이미지 파일 이름
  type: "board" | "reply"; // 이미지가 게시글인지 댓글인지 구분
}

// 대댓글 타입
export interface ReReply {
  content: string;
  goodChk: number; // 좋아요 상태 (0: 빈하트, 1: 빨간하트)
  goodCount: number; // 좋아요 갯수
  isWriter: number; // 내가 쓴 대댓글인지 확인 (0: 아니면, 1: 내가 쓴 대댓글)
  nickName: string; // 대댓글 작성자 닉네임
  reReplyId: number; // 대댓글 ID
  userImg: string | null; // 대댓글 작성자 이미지 (null 가능)
  replyImages: ReplyImage[]; // 대댓글의 이미지 목록
}

// 댓글 타입
export interface Reply {
  accChk: number; // 채택된 댓글인지 확인 (0: 채택안됨, 1: 채택됨)
  content: string; // 댓글 본문
  goodChk: number; // 댓글 좋아요 상태 (0: 빈하트, 1: 빨간하트)
  goodCount: number; // 댓글 좋아요 갯수
  isWriter: number; // 내가 쓴 댓글인지 확인 (0: 아니면, 1: 내가 쓴 댓글)
  nickName: string; // 댓글 작성자 닉네임
  reReplyList: ReReply[]; // 대댓글 목록
  replyId: number; // 댓글 ID
  replyImages: ReplyImage[]; // 댓글 이미지 목록
  userImg: string | null; // 댓글 작성자 이미지 (null 가능)
}

// BoardDetail 타입 (게시글에 대한 정보)
export interface BoardDetail {
  title: string;
  content: string;
  boardId: number;
  scrapChk: number;
  goodChk: number;
  nickName: string;
  userImg: string | null;
  boardPrize: number;
  categoryId: number;
  categoryName: string;
  createdElapsed: string;
  deleteChk: number;
  endCount: number;
  goodCount: number;
  isWriter: number;
  replyCount: number;
  scrapCount: number;
}

// BoardData 타입 (게시글 및 관련된 데이터)
export interface BoardData {
  boardDetail: BoardDetail;
  boardImages: BoardImages[]; // 게시글의 이미지
  replyList: Reply[]; // 댓글 목록
}

export interface BoardImages {
  createdAt: string;
  objectId: number;
  potoId: number;
  potoName: string;
  potoOrigin: string;
  type: "string";
}

//유저
export interface User {
  userId: number;
  accountid: string;
  nameKo: string;
  password?: string;
  nickName?: string;
  email?: string;
  point: number;
  comment: string;
}

export interface ApiResponse {
  result: {
    addPointUserList: any[];
    removePointUserList: any[];
    userAllList: User[];
  };
}
