import React from 'react'

export default function Gallery({imagesArray}:{imagesArray: { prompt: string; url: string }[][]}) {
  return (
    <section className="grid grid-cols-3 gap-5 p-20">
      {imagesArray.map((images, index) => (
        <div key={index} className="flex flex-col gap-5">
          {images.map((image, i) => (
            <img
              key={i}
              src={image.url}
              alt={image.prompt}
              className="rounded-lg border border-gray-300"
            />
          ))}
        </div>
      ))}
    </section>
  )
}
