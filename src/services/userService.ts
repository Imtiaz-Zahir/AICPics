import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function createUser(
  id: string,
  name: string,
  email: string,
  image: string
) {
  return prisma.user.create({ data: { id,email, name, image } });
}

export function getUsersByID(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export function getUsersByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

// function getUsers(where?: Prisma.userWhereInput) {
//   return prisma.user.findMany({ where });
// }

// function getUser(where: Prisma.userWhereUniqueInput) {
//   return prisma.user.findUnique({ where });
// }

// function updateUser(
//   where: Prisma.userWhereUniqueInput,
//   data: Prisma.userUpdateInput
// ) {
//   return prisma.user.update({ where, data });
// }

// function deleteUser(where: Prisma.userWhereUniqueInput) {
//   return prisma.user.delete({ where });
// }

// export { createUser, getUsers, getUser, updateUser, deleteUser };
