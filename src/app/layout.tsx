import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

import AnimationWrapper from "./components/animation-wrapper";

import Header from "./components/header"
import Footer from "./components/footer";

import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";

const TAG_QUERY = `
  *[
    _type == "tag"
    && defined(slug.current)
    && defined(title) 
  ]|order(publishedAt desc){_id, title, color { hex }, slug}
`;

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tags = await client.fetch<SanityDocument[]>(TAG_QUERY);

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} bg-white antialiased font-primary select-none`}>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Patrick+Hand+SC&display=swap" />
        <link rel="stylesheet" href="https://use.typekit.net/ogv2gni.css" />
      </head>
      <body>
        <p className="ml-[46] mt-10 text-4xl text-primary font-bold font-handsome">Emily-Rose Cripps</p>

        <AnimationWrapper>
          <main className="container mx-auto pl-6 pr-4 sm:p-0">
            <div className="mt-6">
              {children}
            </div>
          </main>
        </AnimationWrapper>
        <Footer tags={tags} />
      </body>
    </html>
  );
}
