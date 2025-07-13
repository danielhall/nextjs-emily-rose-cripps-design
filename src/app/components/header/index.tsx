"use client";

import { SanityDocument } from "next-sanity";
import Navigation from "../navigation";


export default function Header({ tags }: { tags: SanityDocument[] }) {
  return (
    <header className="container mx-auto sm:p-0 my-10">
      <div className="inline-block">
        <p className="ml-2 mt-5 text-4xl text-primary font-bold font-handsome">Emily-Rose Cripps</p>
      </div>
      <Navigation tags={tags} />
    </header>
  );
}
