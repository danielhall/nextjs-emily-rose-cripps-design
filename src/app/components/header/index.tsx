"use client";

import { SanityDocument } from "next-sanity";
import Image from "next/image";
import Navigation from "../navigation";


export default function Header({ tags }: { tags: SanityDocument[] }) {
  return (
    <header className="container mx-auto sm:p-0 my-10">
      <div className="flex items-center justify-between">
        <Image
          src="/assets/img/emily-rose-logo.svg"
          alt="Emily-Rose Cripps"
          width={400}
          height={120}
          className="ml-2"
          priority
        />
        <Navigation tags={tags} />
      </div>
    </header>
  );
}
