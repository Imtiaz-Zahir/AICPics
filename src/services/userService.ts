import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function createUser(name: string, email: string, image: string) {
  return prisma.users.create({ data: { email, name, image } });
}

export function getUsersByEmail(email: string) {
  return prisma.users.findUnique({ where: { email } });
}

export function storeLastVisit(email: string) {
  return prisma.users.update({
    where: { email },
    data: { lastVisit: new Date() },
  });
}
