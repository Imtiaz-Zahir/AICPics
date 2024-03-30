"use client";
import { createContext, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

type Image = {
  id: string;
  prompt: string;
  url: string;
  height: number;
  width: number;
};

type ContextProps = {
  likedImages: string[];
  setLikedImages: Dispatch<SetStateAction<string[]>>;
  image: Image | null;
  setImage: Dispatch<SetStateAction<Image | null>>;
};

export const context = createContext<ContextProps | null>(null);

export function Context({ children }: { children: React.ReactNode }) {
  const [likedImages, setLikedImages] = useState<string[]>([]);
  const [image, setImage] = useState<Image | null>({ id: "", prompt: "", url: "", height: 0, width: 0 });

  return (
    <context.Provider value={{ likedImages, setLikedImages, image, setImage }}>
      {children}
    </context.Provider>
  );
}
