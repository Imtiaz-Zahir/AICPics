// 'use server';
// import { PrismaClient, Prisma } from "@prisma/client";

// const prisma = new PrismaClient();

// function createSearch(data: Prisma.searchCreateInput) {
//   return prisma.search.create({ data });
// }

// function getSearches(where?: Prisma.searchWhereInput) {
//   return prisma.search.findMany({
//     where,
//     take: 5,
//     orderBy: { total: "asc" },
//     select: { query: true },
//   });
// }

// function getSearch(where: Prisma.searchWhereUniqueInput) {
//   return prisma.search.findUnique({ where });
// }

// function updateSearch(
//   where: Prisma.searchWhereUniqueInput,
//   data: Prisma.searchUpdateInput
// ) {
//   return prisma.search.update({ where, data });
// }

// function deleteSearch(where: Prisma.searchWhereUniqueInput) {
//   return prisma.search.delete({ where });
// }

// export { createSearch, getSearches, getSearch, updateSearch, deleteSearch };
