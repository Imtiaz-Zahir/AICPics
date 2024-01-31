import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

function createUser(data: Prisma.userCreateInput) {
  return prisma.user.create({ data });
}

function getUsers(where?: Prisma.userWhereInput) {
  return prisma.user.findMany({ where });
}

function getUser(where: Prisma.userWhereUniqueInput) {
  return prisma.user.findUnique({ where });
}

function updateUser(
  where: Prisma.userWhereUniqueInput,
  data: Prisma.userUpdateInput
) {
  return prisma.user.update({ where, data });
}

function deleteUser(where: Prisma.userWhereUniqueInput) {
  return prisma.user.delete({ where });
}

export { createUser, getUsers, getUser, updateUser, deleteUser };
