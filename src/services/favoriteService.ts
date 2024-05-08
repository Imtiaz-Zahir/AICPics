import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function setFavorite(email: string, imageID: string) {
  return prisma.favorites.create({
    data: { email, photoID: imageID },
    include: {
      photos: {
        select: {
          prompt: true,
          displayImage: true,
          id: true,
          thumbnailImage: true,
          height: true,
          width: true,
          size: true,
        },
      },
    },
  });
}

export function removeFavorite(favoriteID: string) {
  return prisma.favorites.delete({ where: { id: favoriteID } });
}

export function getFavorites(email: string) {
  return prisma.favorites.findMany({
    where: { email },
    select: {
      id: true,
      photos: {
        select: {
          prompt: true,
          displayImage: true,
          id: true,
          thumbnailImage: true,
          height: true,
          width: true,
          size: true,
        },
      },
    },
  });
}
