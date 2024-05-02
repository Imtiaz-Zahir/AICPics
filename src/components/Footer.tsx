import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#121212] py-10 px-2 sm:px-5 grid grid-cols-3 justify-center gap-10 text-white">
      <div>
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Synthetic Gallery"
            height={50}
            width={150}
          />
        </Link>
        <p className="text-sm mt-5">
          Discover a vast library of over 20 million stunning, AI-generated
          photos ready for free download on our website. From breathtaking
          landscapes to captivating portraits, explore endless possibilities for
          your creative projects with our diverse collection.
        </p>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold">Quick Links</h3>
        <ul className="flex flex-col gap-2 mt-5">
          <li>
            <Link href={"/photos"}>Photos</Link>
          </li>
          {/* <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li> */}
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Contact Us</h3>
        <form className="flex flex-col gap-3 mt-5 text-black">
          <input
            type="text"
            placeholder="Email"
            className="p-2 w-full rounded-md focus:outline-none"
          />
          <input
            type="text"
            placeholder="Message"
            className="p-2 w-full rounded-md focus:outline-none"
          />
          <button
            type="submit"
            disabled
            className="bg-gray-600 text-white p-2 rounded-md w-full"
          >Submit</button>
        </form>
      </div>
    </footer>
  );
}
