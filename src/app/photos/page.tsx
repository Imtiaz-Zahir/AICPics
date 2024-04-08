import React from "react";
import Gallery from "@/components/Gallery";
import { getImages } from "@/services/imageService";
import Link from "next/link";
import { cookies } from "next/headers";
import ImageDetails from "@/components/ImageDetails";
// import {
//   updateSearch,
//   getSearch,
//   createSearch,
// } from "@/services/searchService";

export default async function page({
  searchParams,
}: {
  searchParams: { search?: string; page?: string };
}) {
  const cookieStore = cookies();
  const width = Number(cookieStore.get("width")?.value ?? 1279);

  const take = 30;

  const currentPage = Number(searchParams.page ?? 1);
  const search = searchParams.search?.replace("+", " ");
  const skip = (currentPage - 1) * take;

  const images = await getImages(skip, take, search);

  const count = 500;
  const totalPage = Math.round(count / take);

  return (
    <>
      <section className="w-[95vw] mx-auto mt-20">
        <h2 className="text-3xl sm:text-7xl font-bold text-center mb-3">
          Explore Gallery <br />
          Find Your Imagination
        </h2>
        <div className="flex items-center justify-between">
          {search ? (
            <h1 className="text-xl sm:text-2xl">
              Total ${count} photos found for{" "}
              <span className="font-bold">{search}</span>{" "}
              {searchParams.page ? `- Page ${currentPage}` : ""}
            </h1>
          ) : (
            <h1 className="text-xl sm:text-2xl">
              Popular Photos {searchParams.page ? `- Page ${currentPage}` : ""}
            </h1>
          )}

          {/* <select name="orientation" className="text-2xl focus:outline-none">
          <option hidden>Orientation</option>
          <option value="horizontal">Horizontal</option>
          <option value="vertical">Vertical</option>
          <option value="square">Square</option>
          <option value="panoramic">Panoramic</option>
        </select> */}
        </div>
        <Gallery key={currentPage} images={images} width={width} />
        <div className="flex items-center justify-between text-xl">
          <p>
            Page <span className="font-semibold">{currentPage}</span> of{" "}
            <span className="font-semibold">{totalPage}</span>
          </p>
          <div className="flex items-center gap-5">
            {currentPage > 1 ? (
              <Link
                href={`/photos?${
                  searchParams.search
                    ? "search=" + searchParams.search + "&"
                    : ""
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
            {currentPage <= totalPage ? (
              <Link
                href={`/photos?${
                  searchParams.search
                    ? "search=" + searchParams.search + "&"
                    : ""
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
      <ImageDetails />
    </>
  );
}
