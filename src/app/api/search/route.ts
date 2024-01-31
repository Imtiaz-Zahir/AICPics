import type { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query");

  if (!query) {
    return new Response("Missing query", { status: 400 });
  }

  try {
    const prevesQuerys = await prisma.serch.findMany({
      where: { query: { startsWith: query } },
      select: { query: true },
      orderBy: { total: "asc" },
      take: 5,
    });
    const suggestions = prevesQuerys.map(({ query }:{query:string}) => query);

    return Response.json(suggestions);
  } catch (error) {
    return new Response("Somthing want wrong!", { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query");

  if (!query) {
    return new Response("Missing query", { status: 400 });
  }

  try {
    const search = await prisma.serch.findFirst({
      where: { query },
      select: { id: true, total: true },
    });

    if (search) {
      await prisma.serch.update({
        where: { id: search.id },
        data: { total: search.total + 1 },
      });
    } else {
      await prisma.serch.create({ data: { query } });
    }
    return new Response("success");
  } catch (error) {
    return new Response("Somthing want wrong!", { status: 500 });
  }
}
