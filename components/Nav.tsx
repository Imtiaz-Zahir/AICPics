"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Nav() {
  const [search, setSearch] = React.useState("");
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (typeof search === "string" && search.length > 0) {
      router.push(`/results?search=${search}`);
    }
  }
  return (
    <nav className="flex items-center justify-between py-3 px-20 fixed w-full bg-black z-50">
      <Link href="/" className="font-medium text-3xl">AI Photos</Link>
      <form className="flex items-center relative" onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          placeholder="I'm looking for..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="h-10 rounded-full px-5 py-2 bg-black focus:outline-none border bg-transparent text-lg"
        />
        <button type="submit" className="absolute right-3">
          <svg className="w-6 h-6" viewBox="0 0 29 29" fill="#FFF">
            <path d="M11.854 21.854c-5.514 0-10-4.486-10-10s4.486-10 10-10 10 4.486 10 10-4.486 10-10 10zm0-18c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.588-8-8-8z"></path>
            <path d="M26.146 27.146a.997.997 0 0 1-.707-.293l-7.694-7.694a.999.999 0 1 1 1.414-1.414l7.694 7.694a.999.999 0 0 1-.707 1.707z"></path>
          </svg>
        </button>
      </form>
    </nav>
  );
}
