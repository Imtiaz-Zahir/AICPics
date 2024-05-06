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

  if (isFavorite) {
    return (
      <svg
        width="32"
        height="32"
        onClick={removeFromFavoriteList}
        className="cursor-pointer"
      >
        <path
          fill="#FF0000"
          d="M-746.862 1102.11c-1.887-1.088-3.98-1.495-5.93-1.041-1.95.453-3.73 1.774-4.998 3.97-1.33 2.304-.947 5.381.034 8.752.981 3.371 2.607 7.077 3.949 10.724.082.21.319.346.541.312 3.828-.661 7.848-1.117 11.261-1.942 3.413-.825 6.28-2.002 7.624-4.33 1.282-2.22 1.499-4.42.912-6.33-.586-1.91-1.956-3.511-3.84-4.599-1.938-1.12-4.282-.842-6.212-.303-.497-1.93-1.407-4.096-3.341-5.212z"
          color="#000"
          overflow="visible"
          transform="rotate(-30 -2415.165 -860.686)"
        ></path>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      onClick={addToFavoriteList}
      className="w-8 h-8 cursor-pointer"
      fill="#FF0000"
    >
      <path d="M16.24 3A6 6 0 0 0 12 4.76a6 6 0 1 0-8.49 8.48L12 21.73l8.49-8.49A6 6 0 0 0 16.24 3Zm2.83 8.83L12 18.9l-7.07-7.07a4 4 0 1 1 5.66-5.66L12 7.59l1.41-1.41a4.1 4.1 0 0 1 5.66 0 4 4 0 0 1 0 5.66Z"></path>
    </svg>
  );
}
