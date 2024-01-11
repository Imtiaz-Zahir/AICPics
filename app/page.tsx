import React from "react";
import { PrismaClient } from '@prisma/client'
import Gallery from "@/components/Gallery";

const prisma = new PrismaClient()

export default async function page() {
  const imagesArray: { prompt: string; url: string }[][] = [[], [], []];
  try {
    await prisma.$connect();
    const photos = await prisma.image.findMany({
      select: { prompt: true, url: true },
      take: 30,
    });
    for (let i = 0; i < photos.length; i++) {
      imagesArray[i % imagesArray.length].push(photos[i]);
    }
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }

  return <Gallery imagesArray={imagesArray} />;
}
