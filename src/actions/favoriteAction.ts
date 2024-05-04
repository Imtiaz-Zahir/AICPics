"use server";
import {
  setFavorite,
  removeFavorite,
  getFavorites,
} from "@/services/favoriteService";

export async function addToFavoriteList(imageId: string, userId: string) {
  try {
    return await setFavorite(userId, imageId);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function removeFromFavoriteList(favoriteID: string) {
  try {
    return await removeFavorite(favoriteID);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getFavoriteList(userId: string) {
  try {
    return await getFavorites(userId);
  } catch (error) {
    console.error(error);
    return [];
  }
}
