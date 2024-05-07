import React from "react";
import Image from "next/image";
import Prompt from "@/components/Prompt";
import Favorite from "@/components/Favorite";

type Image = {
  id: string;
  displayImage: string;
  prompt: string;
  height: number;
  width: number;
  size: number;
};

export default function ImageDetailsContainer({
  imageData,
}: {
  imageData: Image;
}) {
  return (
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:w-3/4">
          <div className="flex justify-center w-full border rounded-lg overflow-hidden relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              style={{ maxHeight: "80vh" }}
              src={imageData.displayImage}
              // className="max-w-full max-h-full"
              alt={imageData.prompt}
            />
            <Favorite imageData={imageData} />
          </div>

          <Prompt prompt={imageData.prompt} />
        </div>
        <div className="lg:w-1/4">
          {/* <div className="flex items-center justify-center w-full aspect-square border rounded overflow-hidden"></div> */}
          <ul className="my-5 text-lg flex flex-col gap-1">
            <li>
              Height : <span className="font-medium">{imageData.height}</span>
            </li>
            <li>
              Width : <span className="font-medium">{imageData.width}</span>
            </li>
            <li>
              Size :{" "}
              <span className="font-medium">
                {(imageData.size / (1024 * 1024)).toFixed(2)} MB
              </span>
            </li>
            {/* <li>
              Downloads : <span className="font-medium">{imageData.download}</span>
            </li> */}
          </ul>
          <a
            href={`/download?imageID=${imageData.id}`}
            download={`${imageData.prompt
              .split(/\s+/)
              .slice(0, 10)
              .join(" ")}.png`}
            className="bg-green-800 py-3 w-full rounded flex items-center justify-center gap-1 text-white text-xl"
          >
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
            DOWNLOAD
          </a>
        </div>
      </div>
  );
}
