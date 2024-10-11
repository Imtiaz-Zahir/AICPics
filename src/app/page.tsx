import React from "react";
import Search from "@/components/Search";
import Image from "next/image";
import creations from "./creations.json";
import Link from "next/link";

export default async function page() {
  return (
    <>
      <section className="rounded-xl flex flex-col justify-center items-center gap-2 lg:gap-5 w-[95%] mx-auto mt-24 py-20 lg:py-44 relative overflow-hidden">
        <h1 className="text-2xl sm:text-7xl font-bold text-center text-white">
          Search Throw <span className="text-red-600">200K+</span>
          <br /> AI Generated Photos
        </h1>
        <Search hero={true} />
        <Image
          src="/hero.jpg"
          style={{
            position: "absolute",
            zIndex: "-1",
            objectFit: "cover",
            filter: "brightness(.5)",
          }}
          fill={true}
          priority={true}
          alt="hero image"
        />
      </section>
      <section className="flex flex-col lg:flex-row justify-between items-center w-2/3 mx-auto gap-5">
        <div className="flex flex-col justify-center items-center">
          <h4 className="text-5xl text-red-600 font-bold">200K+</h4>
          <p className="text-xl font-semibold my-2">Available Image</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h4 className="text-5xl text-red-600 font-bold">150+</h4>
          <p className="text-xl font-semibold my-2">Registered User</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h4 className="text-5xl text-red-600 font-bold">1000+</h4>
          <p className="text-xl font-semibold my-2">Daily Download</p>
        </div>
      </section>
      <section className="mx-5 text-center">
        <h1 className="text-5xl font-bold">
          The Beauty of AI-Generated Images
        </h1>
        <p className="text-2xl my-5">Here are Some Stunning AI Creations</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {creations.map((c, index) => (
            <div key={index} className="w-full flex flex-col gap-3">
              {c.map(({ alt, url }, index) => (
                <Link
                  key={index}
                  href={`/photos?search=${alt
                    .split(/\s+/)
                    .join("+")
                    .toLowerCase()}`}
                >
                  <Image
                    className="rounded-lg mx-auto"
                    src={url}
                    width={640}
                    height={640}
                    alt={alt}
                  />
                </Link>
              ))}
            </div>
          ))}
        </div>
        <Link
          href="/photos"
          className="bg-red-600 text-lg font-medium py-3 px-5 rounded-md"
        >
          More Photos
        </Link>
      </section>
    </>
  );
}
