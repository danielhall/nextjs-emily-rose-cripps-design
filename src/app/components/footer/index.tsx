"use client";

import { SanityDocument } from "next-sanity";
import { FaInstagram, FaImdb, FaLinkedin, FaEtsy } from "react-icons/fa";

import Link from "next/link";

import Tag from "../../components/tag";


export default function Footer({ tags }: { tags: SanityDocument[] }) {
  const today = new Date();

  return (
    <footer className={`container md:mx-auto sm:p-0 mt-20 transition-all mx-4`} >

      <div className="mt-4 mb-8 flex flex flex-col sm:flex-row ">
        {/* Left line */}
        <div className="flex flex-none align-top">
          <div>
            <nav>
              <ul className="list-none inline text-3xl">
                <li className="inline-block m-1"><a target="_blank" href="https://www.instagram.com/emilyrcrippsdesign/"><FaInstagram /></a></li>
                <li className="inline-block m-1"><a target="_blank" href="https://www.imdb.com/name/nm15010073/?ref_=nv_sr_srsg_0_tt_0_nm_2_in_0_q_emily-rose%2520cripps"><FaImdb /></a></li>
                <li className="inline-block m-1"><a target="_blank" href="https://www.linkedin.com/in/emily-rose-cripps-0840b8205/"><FaLinkedin /></a></li>
                <li className="inline-block m-1"><a target="_blank" href="https://www.etsy.com/uk/shop/EmilyRCrippsDesign"><FaEtsy /></a></li>
              </ul>
            </nav>
            <p className="block mt-1 ml-1">Copyright &#169; {today.getFullYear()} Emily-Rose Cripps</p>
            <p className="block ml-1"><Link href="/privacy">Privacy Policy</Link></p>
          </div>
        </div>
        <div className="flex flex-wrap align-top w-full">
          <div className="m-1 lg:pl-6">
            {Array.isArray(tags) && (
              tags.map((tag, index) => (
                <div className="inline-block p-1" key={`tag-${index}`}>
                  <Tag tag={tag} index={index} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
