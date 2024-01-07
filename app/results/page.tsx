import React from "react";
import { PrismaClient } from "@prisma/client";
import Gallery from "@/components/Gallery";

const prisma = new PrismaClient();

export default async function page({searchParams}: {searchParams: any}) {
  const imagesArray: { prompt: string; url: string }[][] = [[], [], []];

  try {
    await prisma.$connect();
    const photos = await prisma.image.findMany({
      select: { prompt: true, url: true },
      where:{prompt: {contains: searchParams.search}},
      take: 30,
    });
    if (photos.length === 0 ) {
      return <p className="text-center p-20">No image found</p>
    }
    for (let i = 0; i < photos.length; i++) {
      imagesArray[i % 3].push(photos[i]);
    }
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }

  return <Gallery imagesArray={imagesArray} />;
}
