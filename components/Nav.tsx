"use client";
import { useContext } from "react";
import Link from "next/link";
import { likeContex } from "@/app/Contex";
import Search from "./search";
// import Image from "next/image";

export default function Nav() {
  const contex = useContext(likeContex);

  

  return (
    <nav className="flex items-center justify-between py-3 px-20 fixed w-full bg-primary z-50">
      <Link href="/" className="font-medium text-3xl">
        AI Photos
      </Link>
      <Search />
      <div className="flex justify-center items-center gap-3">
        <Link href={"/"} className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            className="w-9 h-9"
            fill="#FF0000"
          >
            <path
              d="M32,57,56.36,32.1h0A14.5,14.5,0,0,0,46.42,7c-7.47,0-13.61,5.13-14.35,7.31a.08.08,0,0,1-.15,0C31.19,12.11,25.05,7,17.58,7A14.5,14.5,0,0,0,7.64,32.1h0L32,57"
              data-name="Layer 3"
            ></path>
          </svg>
          <span className="absolute bottom-0 text-sm right-0">
            {contex?.likedImages.length ?? 0}
          </span>
        </Link>
        {/* <Image src={'/'} height={36} width={36} alt='sf'/> */}
      </div>
    </nav>
  );
}
