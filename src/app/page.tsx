"use server";
import React from "react";
import ImageCart from "@/components/ImageCart";
import { getImages } from "@/services/imageService";

export default async function page() {
  try {
    const photos = await getImages();

    return (
      <section className="p-20">
        <h1 className="text-4xl font-semibold my-8">Most Downloaded Photos</h1>
        <div className="grid grid-cols-4 gap-5">
        {photos.map(
          (image: { id: string; url: string; prompt: string }, index: any) => (
            <ImageCart
              key={index}
              imageId={image.id}
              url={image.url}
              prompt={image.prompt}
            />
          )
        )}
        </div>
      </section>
    );
  } catch (error) {
    console.error(error);
  }
}
