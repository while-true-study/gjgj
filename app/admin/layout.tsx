export default function ModalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>; // RootLayout을 사용하지 않고 페이지 내용만 렌더링
}
