"use client";
import { useEffect, useState, useContext } from "react";
import { context } from "@/app/Context";
import Search from "./Search";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Nav() {
  const appContext = useContext(context);
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();

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
    <nav className="flex items-center justify-between gap-2 py-3 bg-white fixed w-full px-2 sm:px-5 z-10">
      <Link href="/">
        <Image
          className="sm:hidden"
          src="/logo-small.png"
          alt="Synthetic Gallery"
          height={50}
          width={50}
          priority={true}
        />
        <Image
          className="hidden sm:block"
          src="/logo.png"
          alt="Synthetic Gallery"
          height={50}
          width={150}
          priority={true}
        />
      </Link>
      <Search />
      <svg
        onClick={() => setMenuOpen((prev) => !prev)}
        className="w-12 z-20 md:hidden"
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
        className={`absolute sm:static bg-white sm:bg-transparent w-full sm:w-auto h-screen sm:h-auto -z-10 ${
          menuOpen ? "left-0" : "left-full"
        } top-16 p-8 sm:p-0 flex flex-col sm:flex-row items-center gap-7 transition-all duration-300`}
        onClick={() => setMenuOpen(false)}
      >
        <ul className="flex flex-col sm:flex-row justify-center items-center gap-5 text-xl font-semibold">
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
        <div>
          {session ? (
            <Image
              src={session.user?.image ?? "/user.png"}
              style={{ borderRadius: "100%" }}
              height={44}
              width={44}
              priority={true}
              alt={session.user?.name ?? "User"}
              unoptimized={true}
            />
          ) : (
            <button
              type="button"
              onClick={() => signIn("google")}
              className="bg-black text-white py-2 px-5 rounded flex items-center gap-2 font-medium"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#EA4335 "
                  d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
                />
                <path
                  fill="#34A853"
                  d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
                />
                <path
                  fill="#4A90E2"
                  d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                />
              </svg>
              Sign in
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
