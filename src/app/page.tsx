"use server";
import React from "react";
import { getImages } from "@/services/imageService";
import Gallery from "@/components/Gallery";

export default async function page() {
  try {
    const photos: { id: string; url: string; prompt: string }[] =
      await getImages({
        take: 30,
        select: { id: true, url: true, prompt: true },
      });
    return (
      <section className="mx-auto w-full">
        <h1 className="text-4xl font-semibold my-8">Most Downloaded Photos</h1>
        <Gallery images={photos} />
      </section>
    );
  } catch (error) {
    console.error(error);
  }
}
