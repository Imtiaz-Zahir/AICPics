"use client";
import { createContext, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

interface ContexProps {
  likedImages: string[];
  setLikedImages: Dispatch<SetStateAction<string[]>>;
}

export const likeContex = createContext<ContexProps | null>(null);

export function Contex({ children }: { children: React.ReactNode }) {
  const [likedImages, setLikedImages] = useState<string[]>([]);

  return (
    <likeContex.Provider value={{ likedImages, setLikedImages }}>
      {children}
    </likeContex.Provider>
  );
}
