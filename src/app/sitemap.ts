import type { MetadataRoute } from "next";
import { getImages } from "@/services/imageService";

const hostname = process.env.VERCEL_PROJECT_PRODUCTION_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const images = await getImages(0, 0);

  return images.reduce<MetadataRoute.Sitemap>((acc, image) => {
    acc.push({
      url: `${hostname}/photos/${image.id}`,
    });
    return acc;
  }, []);
}
