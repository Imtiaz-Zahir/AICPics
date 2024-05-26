import type { MetadataRoute } from "next";
import { getALLImagesIDAndPrompt } from "@/services/imageService";
import { slugGenerator } from "@/lib/urlGenerator";

const hostname = process.env.VERCEL_PROJECT_PRODUCTION_URL || "localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const images = await getALLImagesIDAndPrompt();

  const photosLinks = images.reduce<MetadataRoute.Sitemap>((acc, image) => {
    acc.push({
      url: `https://${hostname}/photos/${slugGenerator(image.prompt, image.id)}`,
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
