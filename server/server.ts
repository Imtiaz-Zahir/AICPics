import express, { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const app: Express = express();
const port = 3000;

app.get("/", async (req: Request, res: Response) => {
  try {
    res.json(await prisma.image.findMany({take:30,select:{id:true}}));
  } catch (error) {
    console.error(error);
  } finally {
    prisma.$disconnect();
  }
});

app.get("/image/:id", async (req: Request, res: Response) => {
    try {
        res.json(req.query.w);
    } catch (error) {
        console.error(error);
    } finally {
        prisma.$disconnect();
    }
    });

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
