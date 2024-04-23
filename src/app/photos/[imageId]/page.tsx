import React from "react";
import { getImageByID } from "@/services/imageService";
import ImageDetailsContainer from "@/components/ImageDetailsContainer";

export default async function page({ params }: { params: { imageId: string } }) {
  const imageData = await getImageByID(params.imageId);

  if (!imageData) {
    return <div>Image not found</div>;
  }

  return (
    <section className="w-[95%] mx-auto mt-20 flex flex-col lg:flex-row gap-10">
      <ImageDetailsContainer imageData={{...imageData,id:params.imageId}} />
    </section>
  );
}
