import ReduxProvider from "@/redux/provider";
import "@/app/global.css";
import { Metadata } from "next";
import Head from "next/head";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "끄적끄적",
  description: "",
  icons: {
    apple: "/logo.svg",
    icon: "/logo.svg",
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
        <link rel="icon" href="/logo.svg" type="image/svg+xml"></link>
      </Head>
      <body className="flex justify-center items-center min-h-screen  bg-gray-200">
        <ReduxProvider>
          <div
            className={`${styles.reative} w-[375px] max-h-[812px] h-[90vh] min-h-[50vh] bg-white shadow-lg rounded-lg overflow-auto scrollbar-hide relative`}
          >
            {children}
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
