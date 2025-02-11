import ReduxProvider from "@/redux/provider";
import "@/app/global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="flex justify-center items-center min-h-screen bg-gray-100">
        <ReduxProvider>
          <div className="w-[375px] h-[812px] bg-white shadow-lg rounded-lg overflow-auto scrollbar-hide">
            {children}
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
