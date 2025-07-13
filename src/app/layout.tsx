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
  ]|order(publishedAt desc){_id, title, color { hex }, slug, displayInMenu}
`;

const tagOptions = createCacheOptions(CACHE_DURATIONS.TAGS, [CACHE_TAGS.TAGS, CACHE_TAGS.NAVIGATION]);

export const metadata: Metadata = {
  metadataBase: new URL('https://www.emilyrcripps.com'),
  title: {
    default: "Emily-Rose Cripps Design | Dynamic Film, TV & Commercial Designer",
    template: "%s | Emily-Rose Cripps Design"
  },
  description: "Dynamic graphic designer creating cutting-edge visuals for film, television, and commercial productions. Specializing in compelling visual narratives that captivate audiences across entertainment media.",
  keywords: [
    "graphic design",
    "film design",
    "television design",
    "commercial design",
    "TV graphics",
    "entertainment design",
    "Emily-Rose Cripps",
    "visual design",
    "motion graphics",
    "film graphics",
    "production design",
    "creative design",
    "dynamic designer",
    "commercial graphics",
    "Wiltshire designer",
    "UK designer"
  ],
  authors: [{ name: "Emily-Rose Cripps" }],
  creator: "Emily-Rose Cripps",
  publisher: "Emily-Rose Cripps Design",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://www.emilyrcripps.com',
    siteName: 'Emily-Rose Cripps Design',
    title: 'Emily-Rose Cripps Design | Dynamic Film, TV & Commercial Designer',
    description: 'Dynamic graphic designer creating cutting-edge visuals for film, television, and commercial productions. Specializing in compelling visual narratives that captivate audiences.',
  },
  twitter: {
    card: 'summary',
    title: 'Emily-Rose Cripps Design | Dynamic Film, TV & Commercial Designer',
    description: 'Dynamic graphic designer creating cutting-edge visuals for film, television, and commercial productions.',
  },
  icons: {
    icon: [
      { url: "/assets/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/assets/favicon/android-icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/assets/favicon/apple-icon-57x57.png", sizes: "57x57" },
      { url: "/assets/favicon/apple-icon-60x60.png", sizes: "60x60" },
      { url: "/assets/favicon/apple-icon-72x72.png", sizes: "72x72" },
      { url: "/assets/favicon/apple-icon-76x76.png", sizes: "76x76" },
      { url: "/assets/favicon/apple-icon-114x114.png", sizes: "114x114" },
      { url: "/assets/favicon/apple-icon-120x120.png", sizes: "120x120" },
      { url: "/assets/favicon/apple-icon-144x144.png", sizes: "144x144" },
      { url: "/assets/favicon/apple-icon-152x152.png", sizes: "152x152" },
      { url: "/assets/favicon/apple-icon-180x180.png", sizes: "180x180" },
    ],
  },
  manifest: "/assets/favicon/manifest.json",
  verification: {
    google: 'google-verification-code', // Replace with actual Google Search Console verification code
    // yandex: 'yandex-verification-code',
    // bing: 'bing-verification-code',
  },
  alternates: {
    canonical: 'https://www.emilyrcripps.com',
  },
  other: {
    "msapplication-TileColor": "#5DBFC1",
    "msapplication-TileImage": "/assets/favicon/ms-icon-144x144.png",
    "theme-color": "#5DBFC1",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tags = await client.fetch<SanityDocument[]>(TAG_QUERY, {}, tagOptions);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://www.emilyrcripps.com/#person",
        "name": "Emily-Rose Cripps",
        "url": "https://www.emilyrcripps.com",
        "jobTitle": "Graphic Designer",
        "worksFor": {
          "@type": "Organization",
          "name": "Emily-Rose Cripps Design"
        },
        "knowsAbout": [
          "Graphic Design",
          "Film Design",
          "Television Graphics",
          "Commercial Design",
          "Visual Design",
          "Motion Graphics"
        ],
        "sameAs": [
          "https://www.instagram.com/emilyrcrippsdesign/",
          "https://www.imdb.com/name/nm15010073/",
          "https://www.linkedin.com/in/emily-rose-cripps-0840b8205/",
          "https://www.etsy.com/uk/shop/EmilyRCrippsDesign"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://www.emilyrcripps.com/#website",
        "url": "https://www.emilyrcripps.com",
        "name": "Emily-Rose Cripps Design",
        "description": "Dynamic graphic designer creating cutting-edge visuals for film, television, and commercial productions",
        "publisher": {
          "@id": "https://www.emilyrcripps.com/#person"
        },
        "inLanguage": "en-GB"
      },
      {
        "@type": "Organization",
        "@id": "https://www.emilyrcripps.com/#organization",
        "name": "Emily-Rose Cripps Design",
        "url": "https://www.emilyrcripps.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.emilyrcripps.com/assets/img/emily-rose-logo.svg"
        },
        "founder": {
          "@id": "https://www.emilyrcripps.com/#person"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "availableLanguage": "English"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Wiltshire",
          "addressCountry": "GB"
        },
        "areaServed": [
          "United Kingdom",
          "Europe",
          "North America"
        ],
        "serviceType": [
          "Graphic Design",
          "Film Design",
          "Television Graphics",
          "Commercial Design",
          "Visual Design"
        ]
      }
    ]
  };

  return (
    <html lang="en-GB" className={`bg-white antialiased font-primary select-none`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
