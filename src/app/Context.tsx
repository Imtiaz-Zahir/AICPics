"use client";
import { createContext, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

type ContextProps = {
  likedImages: string[];
  setLikedImages: Dispatch<SetStateAction<string[]>>;
  imageID: bigint | null;
  setImageID: Dispatch<SetStateAction<bigint | null>>;
};

export const context = createContext<ContextProps | null>(null);

export function Context({ children }: { children: React.ReactNode }) {
  const [likedImages, setLikedImages] = useState<string[]>([]);
  const [imageID, setImageID] = useState<bigint | null>(null);

  return (
    <context.Provider value={{ likedImages, setLikedImages, imageID, setImageID }}>
      {children}
    </context.Provider>
  );
}
