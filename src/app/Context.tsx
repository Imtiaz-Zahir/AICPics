"use client";
import { createContext, useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { SessionProvider } from "next-auth/react";

type ContextProps = {
  likedImages: string[];
  setLikedImages: Dispatch<SetStateAction<string[]>>;
  imageID: string | null;
  setImageID: Dispatch<SetStateAction<string | null>>;
  favorites: FavoriteImage[];
  setFavorites: Dispatch<SetStateAction<FavoriteImage[]>>;
};

type FavoriteImage = {
  id: string;
  prompt: string;
  displayImage: string;
};

export const context = createContext<ContextProps | null>(null);

export function Context({ children }: { children: React.ReactNode }) {
  const [likedImages, setLikedImages] = useState<string[]>([]);
  const [imageID, setImageID] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<FavoriteImage[]>([]);

  useEffect(() => {
    const favoritesImages: FavoriteImage[] = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(favoritesImages);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <context.Provider
      value={{
        likedImages,
        setLikedImages,
        imageID,
        setImageID,
        favorites,
        setFavorites,
      }}
    >
      <SessionProvider>{children}</SessionProvider>
    </context.Provider>
  );
}
