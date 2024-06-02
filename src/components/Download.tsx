"use client";
import React from "react";

export default function Download({
  id,
  prompt,
}: {
  id: string;
  prompt: string;
}) {
  const [loading, setLoading] = React.useState(false);
  function handelDownload() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);

    const link = document.createElement("a");
    link.href = `https://d280om8rayd0ye.cloudfront.net/download/${id}`;
    link.download = `${prompt.split(/\s+/).slice(0, 10).join(" ")}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <button
      type="button"
      onClick={loading?()=>{}:handelDownload}
      className={"bg-green-800 py-3 w-full rounded flex items-center justify-center gap-1 text-white text-xl uppercase "+ (loading?"cursor-not-allowed":"cursor-pointer")}
    >
      {loading ? (
        <svg
          aria-hidden="true"
          className="w-6 h-6 text-green-800 animate-spin fill-white"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-8 h-8"
          fill="#F5F5F5"
        >
          <g data-name="Layer 2">
            <g data-name="download">
              <rect width="16" height="2" x="4" y="18" rx="1" ry="1"></rect>
              <rect
                width="4"
                height="2"
                x="3"
                y="17"
                rx="1"
                ry="1"
                transform="rotate(-90 5 18)"
              ></rect>
              <rect
                width="4"
                height="2"
                x="17"
                y="17"
                rx="1"
                ry="1"
                transform="rotate(-90 19 18)"
              ></rect>
              <path d="M12 15a1 1 0 0 1-.58-.18l-4-2.82a1 1 0 0 1-.24-1.39 1 1 0 0 1 1.4-.24L12 12.76l3.4-2.56a1 1 0 0 1 1.2 1.6l-4 3a1 1 0 0 1-.6.2z"></path>
              <path d="M12 13a1 1 0 0 1-1-1V4a1 1 0 0 1 2 0v8a1 1 0 0 1-1 1z"></path>
            </g>
          </g>
        </svg>
      )}
      {loading ? "Downloading" : "Download"}
    </button>
  );
}
