import React from "react";
import { getImages } from "@/services/imageService";
import Search from "@/components/Search";
import Image from "next/image";
import creations from "./creations.json";


export default async function page() {
  return (
    <>
      <section className="border rounded-xl flex flex-col justify-center items-center gap-2 lg:gap-5 w-[95vw] mx-auto mt-20 py-20 lg:py-44 relative overflow-hidden">
        <h1 className="text-2xl sm:text-7xl font-bold text-center text-white">
          Search Throw <span className="text-red-600">20M+</span>
          <br /> AI Generated Photos
        </h1>
        <Search hero={true} />
        <Image
          src="/creations/abstract-wave-pattern-vibrant-colors-modern-decoration-generated-by-artificial-intelligence.jpg"
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
      <section className="mx-5 text-center">
        <h1 className="text-5xl font-bold">
          The Beauty of AI-Generated Images
        </h1>
        <p className="text-2xl my-5">Here are Some Stunning AI Creations</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1">
          {creations.map((c, index) => (
            <div key={index} className="w-full flex flex-col gap-1">
              {c.map(({ alt, url }, index) => (
                <Image
                  key={index}
                  className="rounded-lg"
                  src={"/creations/" + url}
                  width={370}
                  height={370}
                  alt={alt}
                />
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
