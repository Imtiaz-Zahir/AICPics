"use server";
import React from "react";
import Gallery from "@/components/Gallery";
import { getImages } from "@/services/imageService";
import {
  updateSearch,
  getSearch,
  createSearch,
} from "@/services/searchService";

export default async function page({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const search = searchParams.search;
  try {
    storeSearch(search);

    const photos = await getImages({
      where: {
        prompt: { contains: search },
      },
      take: 100,
    });

    if (photos.length === 0) {
      return <p className="text-center p-20">No image found</p>;
    }

    return <Gallery images={photos} />;
  } catch (error) {
    console.error(error);
  }
}

async function storeSearch(query: string) {
  try {
    const search = await getSearch({ query });
    if (!search) {
      await createSearch({ query });
    } else {
      await updateSearch({ id: search.id }, { total: search.total + 1 });
    }
  } catch (error) {
    console.error(error);
  }
}
