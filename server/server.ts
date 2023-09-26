import express, { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import resize from "./resize";
import cluster from "cluster";
import os from "os";
import cors from "cors";

const prisma = new PrismaClient();

const app: Express = express();
app.use(cors());
const port = 3000;

// if (cluster.isPrimary) {
//   const cpuCount = os.cpus().length;
//   for (let i = 0; i < cpuCount; i++) {
//     cluster.fork();
//   }
// } else {
app.get("/", (req: Request, res: Response) => {
  try {
    prisma.image.findMany({ take: 30, select: { id: true } }).then((images) => {
      res.send(images);
    });
  } catch (error) {
    console.error(error);
  } finally {
    prisma.$disconnect();
  }
});

app.get("/image/:id", (req: Request, res: Response) => {
  try {
    prisma.image
      .findFirst({
        where: { id: req.params.id },
        select: { url: true, height: true, width: true },
      })
      .then(async(image) => {
        if (image) {
          const width: number = Number(req.query.w);
          const height: number = Math.floor(
            (width * image.height) / image.width
          );
          res.setHeader("Cache-Control", "public, max-age=31536000");
          res.send(await resize(image?.url as string, width, height));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  } finally {
    prisma.$disconnect();
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
// }
