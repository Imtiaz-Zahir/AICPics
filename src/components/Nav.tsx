"use client";
import { useEffect, useState, useContext } from "react";
import { context } from "@/app/Context";
import Search from "./Search";
import Link from "next/link";
import Image from "next/image";
import Auth from "@/components/Auth";

export default function Nav() {
  const appContext = useContext(context);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // stop scrolling when menu is open
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  useEffect(() => {
    // add effect if window is scrolled on load
    if (window.scrollY > 0) {
      document.getElementsByTagName("nav")[0].classList.add("scroll");
    }

    // toggle effect on scroll
    window.addEventListener("scroll", () => {
      document
        .getElementsByTagName("nav")[0]
        .classList.toggle("scroll", window.scrollY > 0);
    });
  }, []);

  return (
    <nav className="flex items-center justify-between gap-2 py-3 bg-[#121212] text-white fixed w-full px-2 sm:px-5 z-10">
      <Link href="/">
        <Image
          className="sm:hidden"
          src="/logo-small.png"
          alt="Synthetic Gallery"
          height={46}
          width={46}
          priority={true}
        />
        <Image
          className="hidden sm:block"
          src="/logo.png"
          alt="Synthetic Gallery"
          height={40}
          width={200}
          priority={true}
        />
      </Link>
      <Search />
      <svg
        onClick={() => setMenuOpen((prev) => !prev)}
        className="w-12 z-20 lg:hidden"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          fill="#000"
          d={
            menuOpen
              ? "M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"
              : "M3,8H21a1,1,0,0,0,0-2H3A1,1,0,0,0,3,8Zm18,8H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Zm0-5H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"
          }
        ></path>
      </svg>
      <div
        className={`absolute lg:static bg-white lg:bg-transparent w-full lg:w-auto h-screen lg:h-auto -z-10 ${
          menuOpen ? "left-0" : "left-full"
        } top-16 p-8 lg:p-0 flex flex-col lg:flex-row items-center gap-7 transition-all duration-300`}
        onClick={() => setMenuOpen(false)}
      >
        <ul className="flex flex-col sm:flex-row justify-center items-center gap-5 text-lg font-medium">
          <li>
            <Link href={"/photos"}>Photos</Link>
          </li>
          {/* <li>
            <Link href={"/about"}>About</Link>
          </li> */}
          <li>
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
                {appContext?.favorites.length ?? 0}
              </span>
            </Link>
          </li>
        </ul>
        {/* <Auth/> */}
      </div>
    </nav>
  );
}
