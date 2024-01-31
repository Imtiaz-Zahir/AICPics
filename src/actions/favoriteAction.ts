"use server";
import { createFavorite } from "@/services/favoriteService";

export async function favoriteAction(imageId: string) {
  try {
    const userId = "demo ID";

    createFavorite({
      image: { connect: { id: imageId } },
      user: { connect: { id: userId } },
    });
  } catch (error) {
    
  }
}
