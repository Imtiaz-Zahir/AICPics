
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// function createImage(data: Prisma.imageCreateInput) {
//   return prisma.image.create({ data });
// }

export function getImages() {
  return prisma.images.findMany({take: 10});
}

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