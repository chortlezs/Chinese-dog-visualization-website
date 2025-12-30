import type { Metadata } from "next";
import { Geist, Geist_Mono, Ma_Shan_Zheng, ZCOOL_XiaoWei, Zen_Maru_Gothic, Fredoka, ZCOOL_KuaiLe } from "next/font/google";
import "./globals.css";
import BackgroundAudio from "./components/BackgroundAudio";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const maShanZheng = Ma_Shan_Zheng({
  weight: "400",
  variable: "--font-ma-shan-zheng",
  subsets: ["latin"],
  preload: false,
});

const zcoolXiaoWei = ZCOOL_XiaoWei({
  weight: "400",
  variable: "--font-zcool-xiaowei",
  subsets: ["latin"],
  preload: false,
});

const zenMaruGothic = Zen_Maru_Gothic({
  weight: ["400", "700"],
  variable: "--font-zen-maru-gothic",
  subsets: ["cyrillic", "latin", "latin-ext"], // Zen Maru Gothic supports latin, but let's see available subsets. Usually google fonts have latin.
  preload: false,
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  title: "中国本土全信息科普及保护呼吁",
  description: "信息可视化动态叙事网站 - 中国本土全信息科普及保护呼吁",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${maShanZheng.variable} ${zcoolXiaoWei.variable} ${zenMaruGothic.variable} ${fredoka.variable} antialiased`}
      >
        <BackgroundAudio />
        {children}
      </body>
    </html>
  );
}
