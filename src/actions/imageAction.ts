"use server";
import { getImageByID } from "@/services/imageService";

export default async function imageAction(imageId: bigint) {
  try {
    const image = await getImageByID(imageId);
    return image;
  } catch (error) {
    console.error(error);
    return null;
  }
}
