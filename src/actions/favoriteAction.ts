"use server";
import {
  setFavorite,
  removeFavorite,
  getFavorites,
} from "@/services/favoriteService";

export async function addToFavoriteList(email: string, imageId: string) {
  try {
    return await setFavorite(email, imageId);
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

export async function getFavoriteList(email: string) {
  try {
    return await getFavorites(email);
  } catch (error) {
    console.error(error);
    return [];
  }
}
