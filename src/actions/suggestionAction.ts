// "use server";
// import { getSearches } from "@/services/searchService";

// export async function suggestionsAction(searchText: string) {
//   try {
//     const searchSuggestions = await getSearches({
//       query: { startsWith: searchText },
//     });

//     return searchSuggestions.map(({ query }: { query: string }) => query);
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// }
