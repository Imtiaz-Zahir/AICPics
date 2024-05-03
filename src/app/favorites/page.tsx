"use client";
import { useEffect, useState,useContext } from "react";
import { context } from "@/app/Context";
import type { Metadata } from "next";
import Gallery from "@/components/Gallery";

type FavoritesImages = {
  id: string;
  prompt: string;
  displayImage: string;
};

// export async function generateMetadata({
//   searchParams,
// }: PageParams): Promise<Metadata> {
//   const count = await countImagesCache(searchParams.search);

//   if (count === 0)
//     return {
//       title: `No images found for ${searchParams.search ?? ""}`,
//       description: `No images found for ${searchParams.search ?? ""}`,
//     };

//   const availableImages = count
//     .toString()[0]
//     .concat("0".repeat(count.toString().length - 1))
//     .concat("+");

//   const OGImages = await getImagesCache(0, 5, searchParams.search);

//   return {
//     title: `${availableImages} ${
//       searchParams.search ?? ""
//     } photos available for free download`,
//     description: `${availableImages} ${
//       searchParams.search ?? ""
//     } AI generated photos available for free download.`,
//     openGraph: {
//       images: OGImages.map((image) => ({
//         url: image.thumbnailImage,
//       })),
//     },
//   };
// }

export default function Page() {
  const appContext = useContext(context);
  if (!appContext) return null;
  const favorites = appContext.favorites;

  return (
    <section className="w-[95vw] mx-auto mt-20">
      <h1 className="text-3xl sm:text-7xl font-bold text-center mb-3">
        Your Favorites Images
      </h1>
      <p className="text-xl sm:text-2xl">
        {favorites.length === 0 ? "No" : `Total ${favorites.length}`} photos
        found in your favorites list
      </p>
      <Gallery images={favorites} />
    </section>
  );
}
