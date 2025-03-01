import ReduxProvider from "@/redux/provider";
import "@/app/global.css";
import { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "끄적끄적",
  description: "",
  icons: {
    apple: "/assets/img/logo_square_192.png",
    icon: "/assets/img/logo_square_180.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <Head>
        <script
          defer
          src="https://cdn.swygbro.com/public/widget/swyg-widget.js"
        ></script>
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Head>
      <body className="flex justify-center items-center min-h-screen bg-gray-100">
        <ReduxProvider>
          <div className="w-[375px] h-[812px] bg-white shadow-lg rounded-lg overflow-auto scrollbar-hide relative">
            {children}
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
