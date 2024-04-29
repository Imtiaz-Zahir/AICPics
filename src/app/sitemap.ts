import type { MetadataRoute } from "next";
import { getALLImagesID } from "@/services/imageService";

const hostname = process.env.VERCEL_PROJECT_PRODUCTION_URL || "localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const images = await getALLImagesID();

  return images.reduce<MetadataRoute.Sitemap>((acc, image) => {
    acc.push({
      url: `http://${hostname}/photos/${image.id}`,
    });
    return acc;
  }, []);
}
