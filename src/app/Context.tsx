"use client";
import { createContext, useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { SessionProvider } from "next-auth/react";
import type { ImageData } from "@/types/imageTypes";

type ContextProps = {
  imageData: ImageData | null;
  setImageData: Dispatch<SetStateAction<ImageData | null>>;
  favorites: ImageData[];
  setFavorites: Dispatch<SetStateAction<ImageData[]>>;
};

export const context = createContext<ContextProps | null>(null);

export function Context({ children }: { children: React.ReactNode }) {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [favorites, setFavorites] = useState<ImageData[]>([]);

  useEffect(() => {
    const favoritesImages: ImageData[] = JSON.parse(
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
        imageData,
        setImageData,
        favorites,
        setFavorites,
      }}
    >
      <SessionProvider>{children}</SessionProvider>
    </context.Provider>
  );
}
