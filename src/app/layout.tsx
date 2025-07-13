import type { Metadata } from "next";

import "./globals.css";

import AnimationWrapper from "./components/animation-wrapper";

import Header from "./components/header"
import Footer from "./components/footer";

import { type SanityDocument } from "next-sanity";
import { client, CACHE_DURATIONS, CACHE_TAGS, createCacheOptions } from "@/sanity/client";

const TAG_QUERY = `
  *[
    _type == "tag"
    && defined(slug.current)
    && defined(title) 
  ]|order(publishedAt desc){_id, title, color { hex }, slug}
`;

const tagOptions = createCacheOptions(CACHE_DURATIONS.TAGS, [CACHE_TAGS.TAGS, CACHE_TAGS.NAVIGATION]);

export const metadata: Metadata = {
  title: "Emily-Rose Cripps Design",
  description: "The online portfolio of Emily-Rose Cripps - a graphic design artist for Film & TV",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tags = await client.fetch<SanityDocument[]>(TAG_QUERY, {}, tagOptions);

  return (
    <html lang="en" className={`bg-white antialiased font-primary select-none`}>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Patrick+Hand+SC:wght@400&display=swap" />
        <link rel="stylesheet" href="https://use.typekit.net/ogv2gni.css" />
        <style>{`
          /* Force handsome-pro to load and apply to SVG */
          svg .st0 {
            font-family: "handsome-pro", sans-serif !important;
            font-weight: 700 !important;
          }
          svg .st1 {
            font-family: "Patrick Hand SC", cursive !important;
          }
          /* Preload handsome-pro font */
          .font-preload {
            font-family: "handsome-pro", sans-serif;
            font-weight: 700;
            position: absolute;
            visibility: hidden;
            font-size: 1px;
          }
        `}</style>
      </head>
      <body>
        <div className="font-preload">Handsome Pro</div>
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
