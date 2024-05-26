import type { NextRequest } from "next/server";
import { ImageData } from "@/types/imageTypes";
import { decryptKey } from "@/lib/hash";
import { updateImageForDownload } from "@/services/imageService";

export async function GET(request: NextRequest) {
  try {
    const imageID = request.nextUrl.searchParams.get("imageID");

    if (!imageID) return new Response("No imageID provided", { status: 400 });

    const imageData: ImageData | null = await updateImageForDownload(imageID);

    if (!imageData) return new Response("Image not found", { status: 404 });

    const imageUrl = decryptKey(imageData.key);

    const imageResponse = await fetch(imageUrl);

    if (!imageResponse.ok)
      throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);

    // Set response headers
    const headers = new Headers();
    headers.set("Content-Disposition", `attachment;`);
    headers.set("Content-Type", "image/png");
    headers.set(
      "Cache-Control",
      imageResponse.headers.get("cache-control") || ""
    );
    headers.set(
      "content-length",
      imageResponse.headers.get("content-length") || ""
    );
    headers.set("X-Robots-Tag",imageResponse.headers.get("X-Robots-Tag") || "")

    // Return the image as a streamed response
    return new Response(imageResponse.body, { headers });
  } catch (error) {
    // Handle errors
    console.error("Error while processing request:", error);
    return new Response("Error processing request", { status: 500 });
  }
}
