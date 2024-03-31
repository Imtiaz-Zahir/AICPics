import React from "react";
import Image from "next/image";
import { getImageByID } from "@/services/imageService";
import ImageDetailsContainer from "@/components/ImageDetailsContainer";

// export const getStaticProps = (async () => {
//   return { props: { imgeId:"123" } }
// })

export default async function page({ params }: { params: { imgeId: string } }) {
  const imageData = await getImageByID(params.imgeId);

  if (!imageData) {
    return <div>Image not found</div>;
  }

  return (
    <section className="w-[95%] mx-auto mt-20 flex flex-col lg:flex-row gap-10">
      <ImageDetailsContainer imageData={imageData} />
    </section>
  );
}
