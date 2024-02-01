"use client";
import React, { useEffect, useState } from "react";
import ImageCart from "./ImageCart";

export default function Gallery({
  images,
}: {
  images: { id: string; prompt: string; url: string }[];
}) {
  const [imagesArray, setImagesArray] = useState<
    { id: string; prompt: string; url: string }[][]
  >();

  useEffect(() => {
    const width = window.innerWidth;

    if (width > 767 && width < 1023) {
      setImagesArray(strackerImage(images, 2));
    } else if (width > 1023) {
      setImagesArray(strackerImage(images, 3));
    } else {
      setImagesArray(strackerImage(images, 1));
    }
  }, [images]);

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 w-full">
      {imagesArray?imagesArray.map((photos, index) => (
        <div key={index} className="flex flex-col gap-5">
          {photos.map((image, index) => (
            <ImageCart
              key={index}
              imageId={image.id}
              url={image.url}
              prompt={image.prompt}
            />
          ))}
        </div>
      )):loading()}
    </div>
  );
}

function strackerImage(
  images: { id: string; prompt: string; url: string }[],
  columns: number
) {
  const array = [];
  for (let index = 0; index < columns; index++) {
    array.push([]);
  }
  return images.reduce<{ id: string; prompt: string; url: string }[][]>(
    (acc, curr, index) => {
      acc[index % acc.length].push(curr);
      return acc;
    },
    array
  );
}

function loading(){
  return (
    <>
    <div className="aspect-square w-full bg-slate-700 rounded-lg border border-secondary animate-pulse"></div>
    <div className="aspect-square w-full bg-slate-700 rounded-lg border border-secondary animate-pulse"></div>
    <div className="aspect-square w-full bg-slate-700 rounded-lg border border-secondary animate-pulse"></div>
    <div className="aspect-square w-full bg-slate-700 rounded-lg border border-secondary animate-pulse"></div>
    <div className="aspect-square w-full bg-slate-700 rounded-lg border border-secondary animate-pulse"></div>
    <div className="aspect-square w-full bg-slate-700 rounded-lg border border-secondary animate-pulse"></div>
    <div className="aspect-square w-full bg-slate-700 rounded-lg border border-secondary animate-pulse"></div>
    <div className="aspect-square w-full bg-slate-700 rounded-lg border border-secondary animate-pulse"></div>
    <div className="aspect-square w-full bg-slate-700 rounded-lg border border-secondary animate-pulse"></div>
    </>
  )
}