import React from "react";
import type { Metadata } from "next";
import ImageDetails from "@/components/ImageDetails";
import { notFound } from "next/navigation";
import getIDFromSlag from "@/lib/getIDFromURL";
import Gallery from "@/components/Gallery";
import { slugGenerator } from "@/lib/urlGenerator";

type PageParams = {
  params: { imageSlug: string };
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_URL) throw new Error("API_URL is not defined");

// export async function generateStaticParams() {
//   const images = await getALLImagesIDAndPrompt();
//   return images.map(({ id, prompt }) => slugGenerator(prompt, id));
// }

// export async function generateMetadata({
//   params,
// }: PageParams): Promise<Metadata> {
//   const imageId = getIDFromSlag(params.imageSlug);
//   const imageData = await getImageByID(imageId);
//   if (!imageData) {
//     return {
//       title: "Image not found",
//     };
//   }
//   return {
//     title: `Free download - ${imageData.prompt
//       .split(/\s+/)
//       .slice(0, 6)
//       .join(" ")} AI generated image`,
//     description: `Take a look at this ${imageData.prompt} AI generated image and discover more similar AI generated images. AIGPic offers over 20 million free AI generated images for download.`,
//     openGraph: {
//       images: [
//         {
//           url: imageURLGenerator({
//             id: imageData.id,
//             prompt: imageData.prompt,
//             key: imageData.key,
//           }),
//         },
//       ],
//     },
//   };
// }

export default async function page({ params }: PageParams) {
  if(!params.imageSlug.endsWith(".html")){
    return notFound();
  }
  
  const slugSlices = params.imageSlug.split('_');

  const imageId = slugSlices[slugSlices.length - 1].slice(0, -5);
  
  const res =await fetch(API_URL + "/images/" + imageId);

  const imageData = await res.json();

  // if (
  //   !imageData ||
  //   slugGenerator(imageData.prompt, imageId) !== params.imageSlug
  // ) {
  //   return notFound();
  // }

  return (
    <section className="w-[95%] mx-auto mt-20">
      <ImageDetails imageData={imageData} />
      <h3 className="mt-10 mb-5 text-2xl font-medium">You might also like</h3>
      {/* <Gallery
        images={await getImages(
          0,
          10,
          imageData.prompt.split(/\s+/).slice(0, 3).join(" ")
        )}
      /> */}
    </section>
  );
}
