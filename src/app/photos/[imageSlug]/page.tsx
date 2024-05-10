import { cache } from "react";
import type { Metadata } from "next";
import {
  getImageByID,
  getALLImagesIDAndPrompt,
  getImages,
} from "@/services/imageService";
import ImageDetails from "@/components/ImageDetails";
import { notFound, permanentRedirect } from "next/navigation";
import getIDFromSlag from "@/lib/getIDFromURL";
import createURL from "@/lib/createURL";
import Gallery from "@/components/Gallery";

type PageParams = {
  params: { imageSlug: string };
};

const getImageDataByID = cache(getImageByID);

export async function generateStaticParams() {
  const images = await getALLImagesIDAndPrompt();
  return images.map(({ id, prompt }) => createURL(prompt, id));
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const imageId = getIDFromSlag(params.imageSlug);
  const imageData = await getImageDataByID(imageId);
  if (!imageData) {
    return {
      title: "Image not found",
    };
  }
  return {
    title: `Free download - ${imageData.prompt
      .split(/\s+/)
      .slice(0, 6)
      .join(" ")} AI generated image`,
    description: `Take a look at this ${imageData.prompt} AI generated image and discover more similar AI generated images. AIGPic offers over 20 million free AI generated images for download.`,
    openGraph: {
      images: [
        {
          url: imageData.url
        },
      ],
    },
  };
}

export default async function page({ params }: PageParams) {
  const imageId = getIDFromSlag(params.imageSlug);
  const imageData = await getImageDataByID(imageId);

  if (!imageData) {
    return notFound();
  }

  if (params.imageSlug.length == imageId.length) {
    permanentRedirect(`/photos/${createURL(imageData.prompt, imageId)}`);
  }

  return (
    <section className="w-[95%] mx-auto mt-20">
      <ImageDetails imageData={{ ...imageData, id: imageId }} />
      <h3 className="mt-10 mb-5 text-2xl font-medium">You might also like</h3>
      <Gallery
        images={await getImages(
          0,
          10,
          imageData.prompt.split(/\s+/).slice(0, 3).join(" ")
        )}
      />
    </section>
  );
} 