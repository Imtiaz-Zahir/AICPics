import React from "react";
import Prompt from "@/components/Prompt";
import Favorite from "@/components/Favorite";
import type { ImageData } from "@/types/imageTypes";
import { imageURLGenerator } from "@/lib/urlGenerator";
import Download from "@/components/Download";
import Image from "next/image";

export default function ImageDetailsContainer({
  imageData,
}: {
  imageData: ImageData;
}) {
  const height = Math.round((imageData.height * 800) / imageData.width);
  const width = imageData.width > 800 ? 800 : imageData.width;

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      <div className="lg:w-3/4 h-full">
        <div className="flex justify-center w-full max-h-[80vh] border rounded-lg overflow-hidden relative">
          <Image
            src={imageURLGenerator({
              id: imageData.id,
              key: imageData.key,
              prompt: imageData.prompt,
              width: 800,
              height: height,
            })}
            height={height}
            width={width}
            style={{objectFit:"contain"}}
            priority={true}
            alt={imageData.prompt}
            unoptimized={true}
          />
          <Favorite imageData={imageData} />
        </div>

        <Prompt prompt={imageData.prompt} />
      </div>
      <div className="lg:w-1/4">
        {/* <div className="flex items-center justify-center w-full aspect-square border rounded overflow-hidden"></div> */}
        <ul className="my-5 text-lg flex flex-col gap-1">
          <li>
            Height : <span className="font-medium">{imageData.height} Px</span>
          </li>
          <li>
            Width : <span className="font-medium">{imageData.width} PX</span>
          </li>
          <li>
            Size :{" "}
            <span className="font-medium">
              {(imageData.size / (1024 * 1024)).toFixed(2)} MB
            </span>
          </li>
        </ul>
        <Download id={imageData.id} prompt={imageData.prompt} />
      </div>
    </div>
  );
}
