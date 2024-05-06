"use server";
import { getImageByID, getImages } from "@/services/imageService";

export async function getImageDataByID(imageId: string) {
  try {
    const image = await getImageByID(imageId);
    return image;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getSimilarImages(skip: number, take: number, search?: string){
  try {
    const images = await getImages(skip, take, search);
    return images;
  } catch (error) {
    console.error(error);
    return [];
  }
}