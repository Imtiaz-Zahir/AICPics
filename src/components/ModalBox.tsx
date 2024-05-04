"use client";
import { useContext, useEffect, useState } from "react";
import { context } from "@/app/Context";
import ImageDetails from "./ImageDetails";
import imageAction from "@/actions/imageAction";
import createURL from "@/lib/createURL";

type Image = {
  displayImage: string;
  prompt: string;
  height: number;
  width: number;
  size: number;
};

export default function ModalBox() {
  const appContext = useContext(context);
  const [imageData, setImageData] = useState<Image | null>(null);

  const imageID = appContext?.imageID;
  const setImageID = appContext?.setImageID;

  useEffect(() => {
    if (appContext?.imageID) {
      imageAction(appContext.imageID).then((data) => {
        setImageData(data);
        window.history.pushState(
          {},
          "",
          "/photos/" + createURL(data?.prompt ?? "", appContext.imageID ?? "")
        );
        document.title = `Free download - ${data?.prompt
          .split(/\s+/)
          .slice(0, 6)
          .join(" ")} AI generated image`;
      });

      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      setImageData(null);
    }
  }, [appContext?.imageID]);

  if (!imageID || !setImageID || !imageData) return null;

  return (
    <section className="fixed w-screen h-screen bg-[#00000080] flex items-center justify-center z-20">
      <div className="bg-white py-10 rounded-lg w-[90vw] h-[90vh] overflow-y-scroll">
        <button
          onClick={() => {
            setImageID(null);
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
        <div className="w-[95%] mx-auto flex flex-col lg:flex-row gap-10">
          <ImageDetails imageData={{ ...imageData, id: imageID }} />
        </div>
      </div>
    </section>
  );
}
