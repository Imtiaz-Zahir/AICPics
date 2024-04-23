import type { NextRequest } from "next/server";
import { updateImageForDownload } from "@/services/imageService";

export async function GET(request: NextRequest) {
  try {
    // Get the image URL from the request query parameters
    const imageID = request.nextUrl.searchParams.get("imageID");

    // Check if the URL is provided
    if (!imageID) {
      return new Response("No imageID provided", { status: 400 });
    }

    // Update the download count for the image
    const imageData = await updateImageForDownload(imageID);

    // Fetch the image from the provided URL as a stream
    const imageResponse = await fetch(imageData.url);

    // Check if the image was fetched successfully
    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
    }

    // Set response headers
    const headers = new Headers();
    headers.set("Content-Disposition", "attachment"); // Force download
    headers.set("Content-Type", "image/png"); // Set appropriate content type
    headers.set("Content-Length", imageData.size.toString()); // Set content length


    // Return the image as a streamed response
    return new Response(imageResponse.body, { headers });
  } catch (error) {
    // Handle errors
    console.error("Error while processing request:", error);
    return new Response("Error processing request", { status: 500 });
  }
}
