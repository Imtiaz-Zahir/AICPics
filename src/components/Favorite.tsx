"use client";
import { useContext, useState } from "react";
import { context } from "@/app/Context";

type ImageData = {
  id: string;
  prompt: string;
  displayImage: string;
};

export default function Favorite({ imageData }: { imageData: ImageData }) {
  const appContext = useContext(context);
  if (!appContext) return null;
  const { favorites, setFavorites } = appContext;

  const isFavorite = favorites.some((favorite) => favorite.id === imageData.id);

  function addToFavoriteList() {
    setFavorites([imageData, ...favorites]);
  }

  function removeFromFavoriteList() {
    const newFavorites = favorites.filter(
      (favorite) => favorite.id !== imageData.id
    );
    setFavorites(newFavorites);
  }

  return (
    <svg
      viewBox="0 0 24 24"
      onClick={isFavorite ? removeFromFavoriteList : addToFavoriteList}
      className="w-8 h-8 cursor-pointer"
      fill={isFavorite ? "#FFF" : "#F05454"}
    >
      <path d="M16.24 3A6 6 0 0 0 12 4.76a6 6 0 1 0-8.49 8.48L12 21.73l8.49-8.49A6 6 0 0 0 16.24 3Zm2.83 8.83L12 18.9l-7.07-7.07a4 4 0 1 1 5.66-5.66L12 7.59l1.41-1.41a4.1 4.1 0 0 1 5.66 0 4 4 0 0 1 0 5.66Z"></path>
    </svg>
  );
}
