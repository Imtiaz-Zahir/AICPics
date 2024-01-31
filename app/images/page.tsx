"use server";
import React from "react";
import { PrismaClient } from "@prisma/client";
import Gallery from "@/components/Gallery";

const prisma = new PrismaClient();

export default async function page({ searchParams }: { searchParams: any }) {
  try {
    const photos = await prisma.image.findMany({
      select: { id: true, prompt: true, url: true },
      where: { prompt: { contains: searchParams.search } },
      // take: 30,
    });
    if (photos.length === 0) {
      return <p className="text-center p-20">No image found</p>;
    }
    return <Gallery images={photos} />;
  } catch (error) {
    console.error(error);
  }
}
