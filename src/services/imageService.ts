import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export function getImages(skip: number, take: number, search?: string) {
  return prisma.images.findMany({
    take,
    skip,
    where: search ? { prompt: { contains: search } } : undefined,
    orderBy: { download: "desc"},
  });
}

export function getImageByID(id: string) {
  return prisma.images.findUnique({ where: { id },select:{displayImage:true,prompt:true,height:true,width:true,size:true} });
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

// function createImage(data: Prisma.imageCreateInput) {
//   return prisma.image.create({ data });
// }

// function getImage(where: Prisma.imageWhereUniqueInput) {
//   return prisma.image.findUnique({ where });
// }

// function updateImage(
//   where: Prisma.imageWhereUniqueInput,
//   data: Prisma.imageUpdateInput
// ) {
//   return prisma.image.update({ where, data });
// }

// function deleteImage(where: Prisma.imageWhereUniqueInput) {
//   return prisma.image.delete({ where });
// }

// export { createImage, getImages, getImage, updateImage, deleteImage };
