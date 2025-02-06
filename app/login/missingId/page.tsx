export default function LoginInput() {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <h1 className="text-2xl font-bold mb-4">로그인</h1>
        <form className="w-full max-w-sm flex flex-col gap-4">
          <input
            type="email"
            placeholder="아이디찾기"
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="w-full p-3 border rounded-lg"
          />
          <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-lg">
            로그인
          </button>
        </form>
      </div>
    );
  }
  