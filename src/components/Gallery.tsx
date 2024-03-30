"use client";
import { useEffect, useState } from "react";
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

    if (width > 1279) {
      setImagesArray(strackerImage(images, 5));
    } 
    else if (width > 1023) {
      setImagesArray(strackerImage(images, 4));
    }
    else if (width > 767) {
      setImagesArray(strackerImage(images, 3));
    }
    else if (width > 639) {
      setImagesArray(strackerImage(images, 2));
    }
    else {
      setImagesArray(strackerImage(images, 1));
    }

    // if (width > 767 && width < 1023) {
    //   setImagesArray(strackerImage(images, 2));
    // } else if (width > 1023) {
    //   setImagesArray(strackerImage(images, 3));
    // } else {
    //   setImagesArray(strackerImage(images, 1));
    // }
  }, [images]);

  // const imagesArray = strackerImage(images, 5);
  if (!imagesArray) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 w-full my-5">
        {loading()}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 w-full mt-2 mb-5">
      {imagesArray.map((photos, index) => (
        <div key={index} className="flex flex-col gap-1">
          {photos.map((image) => (
            <ImageCart
              key={image.id}
              imageId={image.id}
              url={image.url}
              prompt={image.prompt}
            />
          ))}
        </div>
      ))}
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