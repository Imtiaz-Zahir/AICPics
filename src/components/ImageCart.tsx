"use client";
import { useContext } from "react";
import { context } from "@/app/Context";
import Image from "next/image";
import Link from "next/link";
import Favorite from "./Favorite";
import { slugGenerator } from "@/lib/urlGenerator";

import type { ImageData } from "@/types/imageTypes";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_URL) throw new Error("API_URL is not defined");

export default function ImageCart({ imageData }: { imageData: ImageData }) {
  const appContext = useContext(context);
  const setImageId = appContext?.setImageId;

  if (!setImageId) return null;

  return (
    <div className="rounded-lg border overflow-hidden w-full relative group">
      <Link
        href={`/photos/${slugGenerator(imageData.prompt, imageData.id)}`}
        onClick={() => setImageId(imageData.id)}
      >
        <Image
          className="group-hover:scale-105 transition-all duration-300 mx-auto"
          src={
            API_URL +
            "/photos/" +
            slugGenerator(imageData.prompt, imageData.id, 437)
          }
          height={437}
          width={437}
          alt={imageData.prompt}
          unoptimized={true}
        />
      </Link>
      <Favorite imageData={imageData} />
    </div>
  );
}
