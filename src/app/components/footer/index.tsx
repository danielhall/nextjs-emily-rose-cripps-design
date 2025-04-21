"use client";

import { SanityDocument } from "next-sanity";
import { FaInstagram, FaImdb, FaLinkedin, FaEtsy } from "react-icons/fa";

import Tag from "../../components/tag";


export default function Footer({ tags }: { tags: SanityDocument[] }) {
  const today = new Date();

  return (
    <footer className={`mt-2 pt-4 pb-2 pl-10 pr-10 top-0 left-0 right-0 z-10 transition-all`} >
    <div className="mt-10 flex items-center">
      {/* Left line */}
      <div className="flex flex-1 h-5 flex-wrap align-top">
        <div className="bg-black h-[3px] m-1 w-full"></div>
        <div className="bg-black h-[3px] m-1 w-full"></div>
      </div>

      {/* Right line */}
      <div className="flex flex-1 h-5 flex-wrap align-top">
        <div className="bg-black h-[3px] m-1 w-full"></div>
        <div className="bg-black h-[3px] m-1 w-full"></div>
      </div>
    </div>

    <div className="mt-4 mb-8 flex flex flex-col sm:flex-row ">
      {/* Left line */}
      <div className="flex flex-none align-top">
        <div>
          <nav>
            <ul className="list-none inline text-3xl">
              <li className="inline-block m-1"><a target="_blank" href="https://www.instagram.com/emilyrcrippsdesign/"><FaInstagram/></a></li>
              <li className="inline-block m-1"><a target="_blank" href="https://www.imdb.com/name/nm15010073/?ref_=nv_sr_srsg_0_tt_0_nm_2_in_0_q_emily-rose%2520cripps"><FaImdb/></a></li>
              <li className="inline-block m-1"><a target="_blank" href="https://www.linkedin.com/in/emily-rose-cripps-0840b8205/"><FaLinkedin/></a></li>
              <li className="inline-block m-1"><a target="_blank" href="https://www.etsy.com/uk/shop/EmilyRCrippsDesign"><FaEtsy/></a></li>
            </ul>
          </nav>
          <p className="block mt-1 ml-1">Copyright &#169; { today.getFullYear() } Emily-Rose Cripps</p>
          <p className="block ml-1"><a href="#">Privacy Policy</a></p>
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
