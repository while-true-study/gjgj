import Input from "@/app/components/input/Input";

export default function LoginInput() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <h1 className="text-2xl font-bold mb-4">로그인</h1>
      <form className="w-full max-w-sm flex flex-col gap-4">
        <Input type="email" label="아이디" name="id" />
        <Input type="password" label="비밀번호" name="password" />
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded-lg"
        >
          로그인
        </button>
      </form>
    </div>
  );
}
