"use client";
import { useState,useEffect, use } from "react";
import ImageCart from "./ImageCart";

export default function Gallery({
  images,
}: {
  images: { id: string; prompt: string; displayImage: string }[];
}) {
  const [width, setWidth] = useState<number>(1279);
  useEffect(() => {
      setWidth(window.innerWidth);
  }, []);

  const imagesArray = (() => {
    if (width > 1279) {
      return strackerImage(images, 5);
    } else if (width > 1023) {
      return strackerImage(images, 4);
    } else if (width > 767) {
      return strackerImage(images, 3);
    } else if (width > 450) {
      return strackerImage(images, 2);
    } else {
      return strackerImage(images, 1);
    }
  })();

  return (
    <div
      className="grid gap-1 w-full mt-2 mb-5"
      style={{
        gridTemplateColumns: `repeat(${imagesArray.length}, minmax(0, 1fr))`,
      }}
    >
      {imagesArray.map((photos, index) => (
        <div key={index} className="flex flex-col gap-1">
          {photos.map((image) => (
            <ImageCart
              key={image.id}
              imageId={image.id}
              url={image.displayImage}
              prompt={image.prompt}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function strackerImage(
  images: { id: string; prompt: string; displayImage: string }[],
  columns: number
) {
  const array = [];
  for (let index = 0; index < columns; index++) {
    array.push([]);
  }
  return images.reduce<
    { id: string; prompt: string; displayImage: string }[][]
  >((acc, curr, index) => {
    acc[index % acc.length].push(curr);
    return acc;
  }, array);
}
