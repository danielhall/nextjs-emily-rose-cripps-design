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
    <html lang="en" className={`bg-white antialiased font-primary select-none`}>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Patrick+Hand+SC&display=swap" />
        <link rel="stylesheet" href="https://use.typekit.net/ogv2gni.css" />
      </head>
      <body>
        <Header tags={tags} />
        <AnimationWrapper>
          <main className="container mx-auto sm:p-0">
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
