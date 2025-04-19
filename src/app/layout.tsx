import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

import AnimationWrapper from "./components/animation-wrapper";

import Header from "./components/header"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Emily-Rose Cripps Design",
  description: "The online portfolio of Emily-Rose Cripps - a graphic design artist for Film & TV",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-main antialiased font-primary select-none`}
      >
        <Header/>
        <AnimationWrapper>
          <main className="container mx-auto flex flex-col gap-4 ">
            <div className="mt-32">
              {children}
            </div>
          </main>
        </AnimationWrapper>
      </body>
    </html>
  );
}
