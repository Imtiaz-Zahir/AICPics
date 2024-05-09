"use client";
import { useContext } from "react";
import { context } from "@/app/Context";
import Image from "next/image";
import Link from "next/link";
import Favorite from "./Favorite";
import createURL from "@/lib/createURL";
import type { ImageData } from "@/types/imageTypes";

export default function ImageCart({
  imageData,
}: {
  imageData: ImageData
}) {
  const appContext = useContext(context);
  const setImageData = appContext?.setImageData;

  if (!setImageData) return null;

  return (
    <div className="rounded-lg border overflow-hidden w-full relative group">
      <Link
        href={`/photos/${createURL(imageData.prompt, imageData.id)}`}
        onClick={() => setImageData(imageData)}
      >
        <Image
          className="group-hover:scale-105 transition-all duration-300 mx-auto"
          src={imageData.thumbnailImage}
          height={640}
          width={640}
          loading="lazy"
          alt={imageData.prompt}
          unoptimized={true}
        />
      </Link>
      {/* <div className="absolute top-0 sm:-top-20 group-hover:top-0 transition-all duration-300 flex items-center justify-between w-full px-5 py-2 pop-down"> */}
        <Favorite
          imageData={imageData}
        />

        {/* <Link href={`/api/image?download=${url}`} download={true}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-8 h-8"
            fill="#F5F5F5"
          >
            <g data-name="Layer 2">
              <g data-name="download">
                <rect width="16" height="2" x="4" y="18" rx="1" ry="1"></rect>
                <rect
                  width="4"
                  height="2"
                  x="3"
                  y="17"
                  rx="1"
                  ry="1"
                  transform="rotate(-90 5 18)"
                ></rect>
                <rect
                  width="4"
                  height="2"
                  x="17"
                  y="17"
                  rx="1"
                  ry="1"
                  transform="rotate(-90 19 18)"
                ></rect>
                <path d="M12 15a1 1 0 0 1-.58-.18l-4-2.82a1 1 0 0 1-.24-1.39 1 1 0 0 1 1.4-.24L12 12.76l3.4-2.56a1 1 0 0 1 1.2 1.6l-4 3a1 1 0 0 1-.6.2z"></path>
                <path d="M12 13a1 1 0 0 1-1-1V4a1 1 0 0 1 2 0v8a1 1 0 0 1-1 1z"></path>
              </g>
            </g>
          </svg>
        </Link> */}
      {/* </div> */}
    </div>
  );
}
