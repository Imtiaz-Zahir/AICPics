"use client";
import { useContext, useEffect, useState } from "react";
import { context } from "@/app/Context";
import ImageDetails from "./ImageDetails";
import { slugGenerator } from "@/lib/urlGenerator";
import Gallery from "./Gallery";
import type { ImageData } from "@/types/imageTypes";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_URL) throw new Error("API_URL is not defined");

export default function ModalBox() {
  const appContext = useContext(context);

  const imageId = appContext?.imageId;
  const setImageId = appContext?.setImageId;
  const [imageData, setImageData] = useState<{
    id: string;
    prompt: string;
    height: number;
    width: number;
    size: number;
  } | null>(null);
  const [similarImages, setSimilarImages] = useState<ImageData[]>([]);

  useEffect(() => {
    function closeModelOnBack() {
      if (setImageId) setImageId(null);
      history.replaceState({}, "", window.location.pathname);
    }

    async function SimilarImages() {
      // const images = await getSimilarImages(0, 10, imageData?.prompt.split(" ").slice(0, 3).join(" "));
      // setSimilarImages(images);
    }

    async function getImageData() {
      const res = await fetch(API_URL + "/images/" + imageId);
      const data = await res.json();
      setImageData(data);
    }

    if (imageId) {
      getImageData();

      window.history.pushState(
        { modalOpen: true },
        "",
        "/photos/" + slugGenerator(imageData?.prompt ?? "", imageData?.id ?? "")
      );
      document.title = `Free download - ${imageData?.prompt
        .split(/\s+/)
        .slice(0, 6)
        .join(" ")} AI generated image`;

      document.body.style.overflow = "hidden";

      window.addEventListener("popstate", closeModelOnBack);
      SimilarImages();

      return () => window.removeEventListener("popstate", closeModelOnBack);
    } else {
      document.body.style.overflow = "auto";
      setSimilarImages([]);
      if (setImageData) setImageData(null);
    }
  }, [setImageData, imageData]);

  if (!imageId || !setImageId || !imageData) return null;

  return (
    <section className="fixed w-full h-screen bg-[#00000080] flex items-center justify-center z-20">
      <div className="bg-white py-10 rounded-lg w-[90%] h-[90vh] overflow-y-scroll">
        <button
          onClick={() => {
            setImageId(null);
            window.history.back();
          }}
          className="absolute top-2 right-2 text-white bg-red-600 p-2 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="w-[95%] mx-auto">
          <ImageDetails imageData={imageData} />
          <h3 className="mt-10 mb-5 text-2xl font-medium">
            You might also like
          </h3>
          <Gallery images={similarImages} />
        </div>
      </div>
    </section>
  );
}
