"use client";
import { useContext } from "react";
import { context } from "@/app/Context";
// import type { Metadata } from "next";
import Gallery from "@/components/Gallery";

// export async function generateMetadata(): Promise<Metadata> {
//   return {
//     title: "Favorites",
//     description: "Your favorite images",
//   };
// }

export default function Page() {
  const appContext = useContext(context);
  if (!appContext) return null;
  const favorites = appContext.favorites;

  return (
    <section className="w-[95%] mx-auto mt-20">
      <h1 className="text-3xl sm:text-7xl font-bold text-center mb-3">
        Your Favorites Images
      </h1>
      <p className="text-xl sm:text-2xl">
        {favorites.length === 0 ? "No" : `Total ${favorites.length}`} photos
        found in your favorites list
      </p>
      {/* <Gallery images={favorites} /> */}
    </section>
  );
}
