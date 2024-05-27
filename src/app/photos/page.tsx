import React from "react";
import type { Metadata } from "next";
import Gallery from "@/components/Gallery";
import { getImages, countImages } from "@/services/imageService";
import Link from "next/link";
import { imageURLGenerator } from "@/lib/urlGenerator";

type PageParams = {
  searchParams: { search?: string; page?: string };
};

export async function generateMetadata({
  searchParams,
}: PageParams): Promise<Metadata> {
  const count = await countImages(searchParams.search);

  if (count === 0)
    return {
      title: `No images found ${
        searchParams.search ? "for " + searchParams.search : ""
      }`,
    };

  const availableImages: string = count
    .toString()
    .slice(0, 2)
    .concat(
      "0".repeat(
        count.toString().length - 2 < 0 ? 0 : count.toString().length - 2
      )
    )
    .concat("+");

  const OGImages = await getImages(0, 4, searchParams.search);

  return {
    title: `${availableImages} ${
      searchParams.search ?? ""
    } photos available for free download`,
    description: `${1000} AI generated ${
      searchParams.search ?? ""
    } photos available for free download.`,
    openGraph: {
      images: OGImages.map((image) => ({
        url: imageURLGenerator({
          id: image.id,
          prompt: image.prompt,
          key: image.key,
        }),
      })),
    },
  };
}

export default async function page({ searchParams }: PageParams) {
  const take = 100;

  const currentPage = Number(searchParams.page ?? 1);
  const search = searchParams.search?.replace("+", " ");
  const skip = (currentPage - 1) * take;

  const images = await getImages(skip, take, search);

  const count = await countImages(search);
  const totalPage = Math.ceil(count / take);

  return (
    <section className="w-[95%] mx-auto mt-20">
      <h2 className="text-3xl sm:text-7xl font-bold text-center mb-3">
        Explore Gallery <br />
        Find Your Imagination
      </h2>
      {search ? (
        <h1 className="text-xl sm:text-2xl">
          Total {count} photos found for{" "}
          <span className="font-bold">{search}</span>{" "}
          {searchParams.page ? `- Page ${currentPage}` : ""}
        </h1>
      ) : (
        <h1 className="text-xl sm:text-2xl">
          Popular Photos {searchParams.page ? `- Page ${currentPage}` : ""}
        </h1>
      )}

      <Gallery images={images} />
      <div className="flex items-center justify-between text-xl">
        <p>
          Page <span className="font-semibold">{currentPage}</span> of{" "}
          <span className="font-semibold">{totalPage}</span>
        </p>
        <div className="flex items-center gap-5">
          {currentPage > 1 ? (
            <Link
              href={`/photos?${
                searchParams.search ? "search=" + searchParams.search + "&" : ""
              }page=${currentPage - 1}`}
              aria-label="Previous"
              className="p-4 border border-red-600 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="20"
                id="arrow"
              >
                <path
                  fillRule="evenodd"
                  d="M10.634.292a1.063 1.063 0 0 0-1.464 0L.607 8.556a1.95 1.95 0 0 0 0 2.827l8.625 8.325c.4.385 1.048.39 1.454.01a.975.975 0 0 0 .01-1.425l-7.893-7.617a.975.975 0 0 1 0-1.414l7.83-7.557a.974.974 0 0 0 0-1.413"
                ></path>
              </svg>
            </Link>
          ) : null}
          <span className="px-4 py-3 border border-red-600 rounded">
            {currentPage}
          </span>
          {currentPage < totalPage ? (
            <Link
              href={`/photos?${
                searchParams.search ? "search=" + searchParams.search + "&" : ""
              }page=${currentPage + 1}`}
              aria-label="Next"
              className="p-4 border border-red-600 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="20"
                id="arrow"
              >
                <path
                  fillRule="evenodd"
                  d="M.366 19.708c.405.39 1.06.39 1.464 0l8.563-8.264a1.95 1.95 0 0 0 0-2.827L1.768.292A1.063 1.063 0 0 0 .314.282a.976.976 0 0 0-.011 1.425l7.894 7.617a.975.975 0 0 1 0 1.414L.366 18.295a.974.974 0 0 0 0 1.413"
                ></path>
              </svg>
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
