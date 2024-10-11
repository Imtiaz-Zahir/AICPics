import React from "react";
import Prompt from "@/components/Prompt";
import Favorite from "@/components/Favorite";
import type { ImageData } from "@/types/imageTypes";
import { slugGenerator } from "@/lib/urlGenerator";
import Download from "@/components/Download";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_URL) throw new Error("API_URL is not defined");

export default function ImageDetailsContainer({
  imageData,
}: {
  imageData: {
    id: string;
    prompt: string;
    height: number;
    width: number;
    size: number;
  };
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-10">
      <div className="lg:w-3/4 h-full">
        <div className="flex justify-center w-full max-h-[80vh] border rounded-lg overflow-hidden relative">
          <Image
            src={API_URL+"/photos/"+slugGenerator(imageData?.prompt??"", imageData.id, 800)}
            // height={height}
            // width={width}
            height={800}
            width={800}
            style={{ objectFit: "contain" }}
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
            Height : <span className="font-medium">{imageData.height} px</span>
          </li>
          <li>
            Width : <span className="font-medium">{imageData.width} px</span>
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
