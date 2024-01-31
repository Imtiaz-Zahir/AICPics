import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

function createFavorite(data: Prisma.favoriteCreateInput) {
  return prisma.favorite.create({ data });
}

function getFavorites(where?: Prisma.favoriteWhereInput) {
  return prisma.favorite.findMany({ where });
}

function getFavorite(where: Prisma.favoriteWhereUniqueInput) {
  return prisma.favorite.findUnique({ where });
}

function updateFavorite(
  where: Prisma.favoriteWhereUniqueInput,
  data: Prisma.favoriteUpdateInput
) {
  return prisma.favorite.update({ where, data });
}

function deleteFavorite(where: Prisma.favoriteWhereUniqueInput) {
  return prisma.favorite.delete({ where });
}

export {
  createFavorite,
  getFavorites,
  getFavorite,
  updateFavorite,
  deleteFavorite,
};
