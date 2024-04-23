import type { NextRequest } from "next/server";
import { updateImageForDownload } from "@/services/imageService";

export async function GET(request: NextRequest) {
  try {
    // Get the image URL from the request query parameters
    const imageURL = request.nextUrl.searchParams.get("url");

    // Check if the URL is provided
    if (!imageURL) {
      return new Response("No image URL provided", { status: 400 });
    }

    // Fetch the image from the provided URL as a stream
    const imageResponse = await fetch(imageURL);

    // Check if the image was fetched successfully
    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
    }

    // Set response headers
    const headers = new Headers();
    headers.set("Content-Disposition", "attachment"); // Force download
    headers.set("Content-Type", "image/png"); // Set appropriate content type
    // headers.set("Content-Length", imageBlob.size.toString()); // Set content length


    // Return the image as a streamed response
    return new Response(imageResponse.body, { headers });
  } catch (error) {
    // Handle errors
    console.error("Error while processing request:", error);
    return new Response("Error processing request", { status: 500 });
  }
}
