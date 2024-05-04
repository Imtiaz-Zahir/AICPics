import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function getImages(skip: number, take: number, search?: string) {
  // if (search) {
  //   return prisma.photos.aggregateRaw({
  //     pipeline: [
  //       {
  //         $search: {
  //           index: "search_prompt",
  //           text: {
  //             query: search,
  //             path: {
  //               wildcard: "*",
  //             },
  //           },
  //         },
  //       },
  //       {
  //         $limit: take,
  //       },
  //       { $sort: { download: 1 } },
  //     ],
  //   });
  // }
  return prisma.photos.findMany({
    take,
    skip,
    where: search ? { prompt: { contains: search } } : undefined,
    orderBy: { download: "desc" },
    select: {
      id: true,
      prompt: true,
      displayImage: true,
    },
  });
}

export function getALLImagesIDAndPrompt() {
  return prisma.photos.findMany({
    select: { id: true, prompt: true },
    orderBy: { download: "desc" },
  });
}

export function getImageByID(id: string) {
  return prisma.photos.findUnique({
    where: { id },
    select: {
      displayImage: true,
      prompt: true,
      height: true,
      width: true,
      size: true,
    },
  });
}

export function countImages(search?: string) {
  return prisma.photos.count({
    where: search ? { prompt: { contains: search } } : undefined,
  });
}

export function updateImageForDownload(id: string) {
  return prisma.photos.update({
    where: { id },
    data: { download: { increment: 1 } },
  });
}
