import { PrismaClient } from "@prisma/client";
import keyGenerator from "@/lib/keyGenerator";
import type { ImageData } from "@/types/imageTypes";
import { cache } from "react";

const prisma = new PrismaClient();

type Image = {
  _id: { $oid: string };
  massageID: string;
  channelID: string;
  attachmentID: string;
  fileName: string;
  expiresAt: string;
  issuedAt: string;
  signature: string;
  prompt: string;
  height: number;
  width: number;
  size: number;
};

export const getImages = cache(
  async (skip: number, take: number, search?: string): Promise<ImageData[]> => {
    const result: ImageData[] = [];

    // if (search) {
    //   const images = (await prisma.photos.aggregateRaw({
    //     pipeline: [
    //       {
    //         $search: {
    //           text: {
    //             query: search,
    //             path: "prompt",
    //           },
    //         },
    //       },

    //       { $skip: skip },
    //       {
    //         $limit: take,
    //       },
    //       {
    //         $project: {
    //           _id: 1,
    //           massageID: 1,
    //           channelID: 1,
    //           attachmentID: 1,
    //           fileName: 1,
    //           expiresAt: 1,
    //           issuedAt: 1,
    //           signature: 1,
    //           prompt: 1,
    //           height: 1,
    //           width: 1,
    //           size: 1,
    //           download: 1,
    //           // score: { $meta: "searchScore" },
    //         },
    //       },
    //       // {
    //       //   $match: {
    //       //     score: { $gt: 5 },
    //       //   },
    //       // },
    //       { $sort: { download: -1 } },
    //       { $unset: ["download"] },
    //     ],
    //   })) as unknown as Image[];

    //   images.forEach(async (image) =>
    //     result.push({
    //       id: image._id.$oid,
    //       prompt: image.prompt,
    //       key: await keyGenerator({ ...image }),
    //       height: image.height,
    //       width: image.width,
    //       size: image.size,
    //     })
    //   );
    // } else {
      const images = await prisma.photos.findMany({
        take,
        skip,
        where: search ? { prompt: { contains: search } } : undefined,
        orderBy: { download: "desc" },
        select: {
          id: true,
          massageID: true,
          prompt: true,
          channelID: true,
          attachmentID: true,
          fileName: true,
          expiresAt: true,
          issuedAt: true,
          signature: true,
          height: true,
          width: true,
          size: true,
        },
      });

      images.forEach(async (image) =>
        result.push({
          id: image.id,
          prompt: image.prompt,
          key: await keyGenerator(image),
          height: image.height,
          width: image.width,
          size: image.size,
        })
      );
    // }
    return result;
  }
);

export const countImages = cache(async (search?: string) => {
  // if (search) {
  //   const result = (await prisma.photos.aggregateRaw({
  //     pipeline: [
  //       {
  //         $search: {
  //           text: {
  //             query: search,
  //             path: "prompt",
  //           },
  //         },
  //       },
  //       // {
  //       //   $project: {
  //       //     score: { $meta: "searchScore" },
  //       //   },
  //       // },
  //       // {
  //       //   $match: {
  //       //     score: { $gt: 5 },
  //       //   },
  //       // },
  //       {
  //         $count: "total",
  //       },
  //     ],
  //   })) as unknown as { total: number }[];

  //   if (result.length === 0) return 0;

  //   return result[0].total
  // }
  return prisma.photos.count({
    where: search ? { prompt: { contains: search } } : undefined,
  });
});

export const getALLImagesIDAndPrompt = cache(async () => {
  return prisma.photos.findMany({
    select: { id: true, prompt: true },
    take: 10000,
    orderBy: { download: "desc" },
  });
});

export const getImageByID = cache(
  async (id: string): Promise<ImageData | null> => {
    const image = await prisma.photos.findUnique({
      where: { id },
      select: {
        id: true,
        massageID: true,
        prompt: true,
        channelID: true,
        attachmentID: true,
        fileName: true,
        expiresAt: true,
        issuedAt: true,
        signature: true,
        height: true,
        width: true,
        size: true,
      },
    });

    if (!image) return null;

    return {
      id: image.id,
      prompt: image.prompt,
      key: await keyGenerator(image),
      height: image.height,
      width: image.width,
      size: image.size,
    };
  }
);

export async function updateImageForDownload(
  id: string
): Promise<ImageData | null> {
  const image = await prisma.photos.update({
    where: { id },
    data: { download: { increment: 1 } },
  });
  if (!image) return null;

  return {
    id: image.id,
    prompt: image.prompt,
    key: await keyGenerator(image),
    height: image.height,
    width: image.width,
    size: image.size,
  };
}

export async function updateAttachmentByID(
  massageID: string,
  {
    expiresAt,
    issuedAt,
    signature,
  }: { expiresAt: string; issuedAt: string; signature: string }
): Promise<ImageData | null> {
  const image = await prisma.photos.update({
    where: { massageID },
    data: { expiresAt, issuedAt, signature },
  });

  if (!image) return null;

  return {
    id: image.id,
    prompt: image.prompt,
    key: await keyGenerator(image),
    height: image.height,
    width: image.width,
    size: image.size,
  };
}
