import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const imageURL = request.nextUrl.searchParams.get("download");
  if (!imageURL) {
    return new Response("No image URL provided", { status: 400 });
  }
  try {
    const imageResponse = await fetch(imageURL);
    const image = await imageResponse.blob();
    const headers = new Headers();
    headers.set("Content-Disposition", "attachment");
    headers.set("Content-Type", "image/jpeg");
    return new Response(image, { headers });
  } catch (error) {
    console.error(error);
    return new Response("Error while downloading image", { status: 500 });
  }
}
