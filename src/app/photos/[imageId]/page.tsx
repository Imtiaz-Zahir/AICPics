import React from "react";
import type { Metadata } from "next";
import { getImageByID , getImages } from "@/services/imageService";
import ImageDetailsContainer from "@/components/ImageDetailsContainer";

type PageParams = {
  params:{imageId: string;}
};

export async function generateStaticParams() {
  const images = await getImages(0, 100);
  return images.map(({id})=>id)
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const imageData = await getImageByID(params.imageId);
  if (!imageData) {
    return {
      title: "Image not found",
      description: "Image not found",
    };
  }
  return {
    title: `Free download - ${imageData.prompt} AI generated image`,
    description: `Take a look at this ${imageData.prompt} AI generated image and discover more similar AI generated images. AIGPic offers over 20 million free AI generated images for download.`,
    openGraph:{
      images:[
        {
          url:imageData.thumbnailImage,
        }
      ]
    }
  };
}

export default async function page({
  params,
}: PageParams) {
  const imageData = await getImageByID(params.imageId);

  if (!imageData) {
    return <div>Image not found</div>;
  }

  return (
    <section className="w-[95%] mx-auto mt-20 flex flex-col lg:flex-row gap-10">
      <ImageDetailsContainer imageData={{ ...imageData, id: params.imageId }} />
    </section>
  );
}
