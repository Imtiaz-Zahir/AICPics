"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { suggestionsAction } from "@/actions";
import Link from "next/link";

export default function Search() {
  const [search, setSearch] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (search.length > 0) {
      router.push(`/images?search=${search}`);
    }
  }

  useEffect(() => {
    if (search.length > 0) {
      suggestionsAction(search).then((res) => setSearchSuggestions(res));
    } else {
      setSearchSuggestions([]);
    }
  }, [search]);

  return (
    <form className="flex items-center relative w-2/5" onSubmit={handleSubmit}>
      <input
        type="text"
        name="search"
        placeholder="I'm looking for..."
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="h-10 rounded-full px-5 py-2 w-full focus:outline-none border border-secondary bg-transparent text-lg"
      />
      <button type="submit" className="absolute right-3">
        <svg className="w-6 h-6" viewBox="0 0 29 29" fill="#F5F5F5">
          <path d="M11.854 21.854c-5.514 0-10-4.486-10-10s4.486-10 10-10 10 4.486 10 10-4.486 10-10 10zm0-18c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.588-8-8-8z"></path>
          <path d="M26.146 27.146a.997.997 0 0 1-.707-.293l-7.694-7.694a.999.999 0 1 1 1.414-1.414l7.694 7.694a.999.999 0 0 1-.707 1.707z"></path>
        </svg>
      </button>
      {isFocused && searchSuggestions.length > 0 && (
        <ul className="absolute top-12 w-full bg-[#222222] rounded-xl text-lg overflow-hidden">
          {searchSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="hover:bg-[#363636] px-5 py-1 font-medium"
            >
              <Link href={`/images?search=${suggestion}`}>
                {suggestion}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
