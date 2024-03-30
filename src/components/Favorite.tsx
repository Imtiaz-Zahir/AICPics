"use client";
import { useContext, useState } from "react";
// import { context } from "@/app/Context";

export default function Favorite({ imageId }: { imageId: string }) {
  const [isFavorite, setIsFavorite] = useState(false);
  // const appContext = useContext(context);

  return (
    <svg
      viewBox="0 0 24 24"
      onClick={() => {
        console.log(imageId);
      }}
      className="w-8 h-8 cursor-pointer"
      fill="#F05454"
    >
      <path d="M16.24 3A6 6 0 0 0 12 4.76a6 6 0 1 0-8.49 8.48L12 21.73l8.49-8.49A6 6 0 0 0 16.24 3Zm2.83 8.83L12 18.9l-7.07-7.07a4 4 0 1 1 5.66-5.66L12 7.59l1.41-1.41a4.1 4.1 0 0 1 5.66 0 4 4 0 0 1 0 5.66Z"></path>
    </svg>
  );
}
