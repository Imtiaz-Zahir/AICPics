"use server";
import {
  getSearches,
  getSearch,
  updateSearch,
  createSearch,
} from "@/services/searchService";

export async function suggestionsAction(searchText: string) {
  try {
    const searchSuggestions = await getSearches(searchText);

    return searchSuggestions.map(({ search }) => search);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function storeSearch(searchText: string) {
  try {
    const existingSearch = await getSearch(searchText);

    if (existingSearch) {
      await updateSearch(searchText);
    } else {
      await createSearch(searchText);
    }
  } catch (error) {
    console.error(error);
  }
}
