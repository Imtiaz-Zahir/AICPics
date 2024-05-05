import { cache } from "react";
import type { Metadata } from "next";
import { getImageByID, getALLImagesIDAndPrompt } from "@/services/imageService";
import ImageDetails from "@/components/ImageDetails";
import { notFound } from "next/navigation";
import getIDFromSlag from "@/lib/getIDFromURL";
import createURL from "@/lib/createURL";

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
  if (!imageData || params.imageSlug.length == imageId.length) {
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
          url: imageData.displayImage,
        },
      ],
    },
  };
}

export default async function page({ params }: PageParams) {
  const imageId = getIDFromSlag(params.imageSlug);
  const imageData = await getImageDataByID(imageId);

  if (!imageData || params.imageSlug.length == imageId.length) {
    return notFound();
  }

  return (
    <section className="w-[95%] mx-auto mt-20 flex flex-col lg:flex-row gap-10">
      <ImageDetails imageData={{ ...imageData, id: imageId }} />
    </section>
  );
}
