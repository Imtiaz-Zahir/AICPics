"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Gallery({
  imagesArray,
}: {
  imagesArray: { prompt: string; url: string }[][];
}) {
  return (
    <section className="grid grid-cols-3 gap-5 p-20">
      {imagesArray.map((images, index) => (
        <div key={index} className="flex flex-col gap-5">
          {images.map((image, i) => (
            <div
              key={i}
              className="rounded-lg imageShadow overflow-hidden w-full relative"
            >
              <Image
                className="hover:scale-105 transition-all duration-300"
                src={image.url}
                height={450}
                width={450}
                alt={image.prompt}
              />
              <div className="absolute bottom-0 flex items-center justify-between w-full px-5 py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  data-name="Layer 1"
                  viewBox="0 0 24 24"
                  // onClick={() => {}}
                  className="w-12 h-12 cursor-pointer"
                  fill="#F05454"
                >
                  <path d="M16.24 3A6 6 0 0 0 12 4.76a6 6 0 1 0-8.49 8.48L12 21.73l8.49-8.49A6 6 0 0 0 16.24 3Zm2.83 8.83L12 18.9l-7.07-7.07a4 4 0 1 1 5.66-5.66L12 7.59l1.41-1.41a4.1 4.1 0 0 1 5.66 0 4 4 0 0 1 0 5.66Z"></path>
                </svg>
                <Link
                  href={`/api/image?download=${image.url}`}
                  download={true}
                  className="border border-secondary rounded-full px-5 py-3 transition-all uppercase font-medium inline-flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    fill="#F5F5F5"
                  >
                    <g data-name="Layer 2">
                      <g data-name="download">
                        <rect
                          width="16"
                          height="2"
                          x="4"
                          y="18"
                          rx="1"
                          ry="1"
                        ></rect>
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
                  download
                </Link>
              </div>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}