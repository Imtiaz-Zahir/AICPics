import React from "react";
import ImageCart from "./ImageCart";

export default function Gallery({
  images,
}: {
  images: { id: string; prompt: string; url: string }[];
}) {
  return (
    <section className="grid grid-cols-4 gap-5 p-20">
      {/* {imagesArray.map((images, index) => (
        <div key={index} className="flex flex-col gap-5"> */}
      {images.map((image, index) => (
        <ImageCart
          key={index}
          imageId={image.id}
          url={image.url}
          prompt={image.prompt}
        />
      ))}
      {/* </div>
      ))} */}
    </section>
  );
}
