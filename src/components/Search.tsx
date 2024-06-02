"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { storeSearch, suggestionsAction } from "@/actions/searchAction";

export default function Search({ hero }: { hero?: boolean }) {
  const [search, setSearch] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    setIsLoading(false);
  }, [params]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isLoading) return;

    const currentSearch = search.replace(/\s/g, "+").toLowerCase();
    setIsLoading(true);
    setIsFocused(false);

    if (search.length === 0) {
      router.push("/photos");
    } else {
      router.push(`/photos?search=${currentSearch}`);
      storeSearch(currentSearch);
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search.length > 0) {
        suggestionsAction(search).then((response) => {
          setSearchSuggestions(response);
        });
      } else {
        setSearchSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <form
      className="flex items-center relative w-3/4 lg:w-2/4"
      onSubmit={handleSubmit}
    >
      {isLoading ? (
        <svg
          aria-hidden="true"
          className="w-6 h-6 text-black animate-spin fill-white absolute left-3"
          viewBox="0 0 100 101"
          fill="none"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      ) : (
        <button
          type="submit"
          className="absolute left-3"
          name="search"
          aria-label="search"
        >
          <svg className="w-6 h-6" viewBox="0 0 29 29" fill="#000">
            <path d="M11.854 21.854c-5.514 0-10-4.486-10-10s4.486-10 10-10 10 4.486 10 10-4.486 10-10 10zm0-18c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.588-8-8-8z"></path>
            <path d="M26.146 27.146a.997.997 0 0 1-.707-.293l-7.694-7.694a.999.999 0 1 1 1.414-1.414l7.694 7.694a.999.999 0 0 1-.707 1.707z"></path>
          </svg>
        </button>
      )}

      <input
        type="text"
        name="search"
        placeholder="I'm looking for..."
        autoComplete="off"
        onFocus={() => setIsFocused(true)}
        onBlur={() =>
          setTimeout(() => {
            setIsFocused(false);
          }, 300)
        }
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className={`py-2 w-full focus:outline-none border border-black ${
          hero ? "rounded-lg px-12 h-12" : "rounded-full px-12 h-10"
        }`}
      />

      {search && (
        <button
          type="reset"
          className="absolute right-3"
          name="clear-search"
          aria-label="search"
          onClick={() => setSearch("")}
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#000">
            {" "}
            <path d="M5.3 18.7c.2.2.4.3.7.3s.5-.1.7-.3l5.3-5.3 5.3 5.3c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L13.4 12l5.3-5.3c.4-.4.4-1 0-1.4s-1-.4-1.4 0L12 10.6 6.7 5.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l5.3 5.3-5.3 5.3c-.4.4-.4 1 0 1.4z"></path>
          </svg>
        </button>
      )}
      {!hero && isFocused && searchSuggestions.length > 0 && (
        <ul className="absolute top-12 w-full bg-[#222222] rounded-xl text-lg overflow-hidden">
          {searchSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="hover:bg-[#363636] px-5 py-1 font-medium text-white cursor-pointer"
              onClick={() => {
                setSearch(suggestion.replaceAll("+", " "));
                setIsFocused(false);
                router.push(`/photos?search=${suggestion}`);
                setIsLoading(true);
              }}
            >
              {suggestion.replaceAll("+", " ")}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
