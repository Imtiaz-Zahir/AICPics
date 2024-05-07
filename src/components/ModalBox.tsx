"use client";
import { useContext, useEffect } from "react";
import { context } from "@/app/Context";
import ImageDetails from "./ImageDetails";
import createURL from "@/lib/createURL";

export default function ModalBox() {
  const appContext = useContext(context);

  const imageData = appContext?.imageData;
  const setImageData = appContext?.setImageData;

  useEffect(() => {
    function closeModelOnBack() {
      if (setImageData) setImageData(null);
      history.replaceState({}, "", window.location.pathname);
    }

    if (imageData) {
      window.history.pushState(
        { modalOpen: true },
        "",
        "/photos/" + createURL(imageData?.prompt ?? "", imageData?.id ?? "")
      );
      document.title = `Free download - ${imageData?.prompt
        .split(/\s+/)
        .slice(0, 6)
        .join(" ")} AI generated image`;

      document.body.style.overflow = "hidden";

      window.addEventListener("popstate", closeModelOnBack);

      return () => window.removeEventListener("popstate", closeModelOnBack);
    } else {
      document.body.style.overflow = "auto";
      if (setImageData) setImageData(null);
    }
  }, [setImageData, imageData]);

  if (!imageData || !setImageData) return null;

  return (
    <section className="fixed w-screen h-screen bg-[#00000080] flex items-center justify-center z-20">
      <div className="bg-white py-10 rounded-lg w-[90vw] h-[90vh] overflow-y-scroll">
        <button
          onClick={() => {
            setImageData(null);
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
        </div>
      </div>
    </section>
  );
}
