"use client";
import { createContext, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

interface ContextProps {
  likedImages: string[];
  setLikedImages: Dispatch<SetStateAction<string[]>>;
  // deviceWidth: number | null;
  // setDeviceWidth: Dispatch<SetStateAction<number | null>>;
}

export const context = createContext<ContextProps | null>(null);

export function Context({ children }: { children: React.ReactNode }) {
  const [likedImages, setLikedImages] = useState<string[]>([]);
  // const [deviceWidth, setDeviceWidth] = useState<number|null>(null);

  return (
    <context.Provider value={{ likedImages, setLikedImages}}>
      {children}
    </context.Provider>
  );
}
