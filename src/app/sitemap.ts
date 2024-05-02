import type { MetadataRoute } from "next";
import { getALLImagesID } from "@/services/imageService";

const hostname = process.env.VERCEL_PROJECT_PRODUCTION_URL || "localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const images = await getALLImagesID();

  const photosLinks = images.reduce<MetadataRoute.Sitemap>((acc, image) => {
    acc.push({
      url: `https://${hostname}/photos/${image.id}`,
    });
    return acc;
  }, []);

  return [
    {
      url: `https://${hostname}`,
    },
    {
      url: `https://${hostname}/photos`,
    },
    ...photosLinks,
  ];
}
