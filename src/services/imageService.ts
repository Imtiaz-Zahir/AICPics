import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function getImages(skip: number, take: number, search?: string) {
  return prisma.images.findMany({
    take,
    skip,
    where: search ? { prompt: { contains: search } } : undefined,
    orderBy: { download: "desc" }
  });
}

export function getALLImagesID() {
  return prisma.images.findMany({
    select: { id: true },
  });
}

export function getImageByID(id: string) {
  return prisma.images.findUnique({
    where: { id },
    select: {
      displayImage: true,
      prompt: true,
      height: true,
      width: true,
      size: true,
      thumbnailImage: true,
    },
  });
}

export function countImages(search?: string) {
  return prisma.images.count({
    where: search ? { prompt: { contains: search } } : undefined,
  });
}

export function updateImageForDownload(id: string) {
  return prisma.images.update({
    where: { id },
    data: { download: { increment: 1 } },
  });
}