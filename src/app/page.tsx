"use server";
import React from "react";
import { PrismaClient } from "@prisma/client";
import Gallery from "@/components/Gallery";

const prisma = new PrismaClient();

export default async function page() {
  // const imagesArray: { prompt: string; url: string }[][] = [[], [], [], []];
  try {
    const photos = await prisma.image.findMany({
      select: { id:true ,prompt: true, url: true },
      // take: 30,
    });
    return <Gallery images={photos} />;
  } catch (error) {
    console.error(error);
  }
}
