"use client";
import { useContext } from "react";
import { likeContex } from "@/app/Contex";
import Search from "./Search";
import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  const contex = useContext(likeContex);

  return (
    <nav className="flex items-center justify-between py-3 px-20 fixed w-full bg-primary z-50">
      <Link href="/" className="font-medium text-3xl">
        AI Photos
      </Link>
      <Search />
      <div className="flex justify-center items-center gap-5">
        <Link href={"/favorites"} className="relative">
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

        {false ? (
          <Image src={"/"} height={36} width={36} alt="sf" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="36"
            height="36"
            viewBox="0 0 48 48"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
        )}
      </div>
    </nav>
  );
}
