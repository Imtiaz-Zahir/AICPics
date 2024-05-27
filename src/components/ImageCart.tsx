"use client";
import { useContext } from "react";
import { context } from "@/app/Context";
import Image from "next/image";
import Link from "next/link";
import Favorite from "./Favorite";
import { imageURLGenerator, slugGenerator } from "@/lib/urlGenerator";
import type { ImageData } from "@/types/imageTypes";

export default function ImageCart({ imageData }: { imageData: ImageData }) {
  const appContext = useContext(context);
  const setImageData = appContext?.setImageData;

  if (!setImageData) return null;

  return (
    <div className="rounded-lg border overflow-hidden w-full relative group">
      <Link
        href={`/photos/${slugGenerator(imageData.prompt, imageData.id)}`}
        onClick={() => setImageData(imageData)}
      >
        <Image
          className="group-hover:scale-105 transition-all duration-300 mx-auto"
          src={imageURLGenerator({
            id: imageData.id,
            key: imageData.key,
            prompt: imageData.prompt,
            width: 437,
            height: Math.round((imageData.height * 437) / imageData.width),
          })}
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
