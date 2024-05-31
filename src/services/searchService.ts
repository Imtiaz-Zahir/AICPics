import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function createSearch(search: string) {
  return prisma.searches.create({ data: { search } });
}

export function getSearches(search: string) {
  return prisma.searches.findMany({
    where: { search: { startsWith: search } },
    take: 5,
    orderBy: { count: "asc" },
    select: { search: true },
  });
}

export function getSearch(search: string) {
  return prisma.searches.findUnique({ where: { search } });
}

export function updateSearch(search: string) {
  return prisma.searches.update({
    where: { search },
    data: { count: { increment: 1 } },
  });
}