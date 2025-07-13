"use client";

import { SanityDocument } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import Navigation from "../navigation";


export default function Header({ tags }: { tags: SanityDocument[] }) {
  return (
    <header className="container mx-auto sm:p-0 my-10">
      <div className="flex items-center justify-between">
        <Link href="/" className="ml-2">
          <Image
            src="/assets/img/emily-rose-logo.svg"
            alt="Emily-Rose Cripps"
            width={400}
            height={120}
            priority
          />
        </Link>
        <Navigation tags={tags} />
      </div>
    </header>
  );
}
