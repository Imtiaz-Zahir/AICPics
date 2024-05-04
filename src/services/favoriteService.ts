import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function setFavorite(userID: string, imageID: string) {
  return prisma.favorites.create({ data: { userID, photoID: imageID } });
}

export function removeFavorite(favoriteID: string) {
  return prisma.favorites.delete({ where: { id: favoriteID } });
}

export function getFavorites(userID: string) {
  return prisma.favorites.findMany({
    where: { userID },
    select: {
      id: true,
      photos: { select: { prompt: true, displayImage: true, id: true } },
    },
  });
}
