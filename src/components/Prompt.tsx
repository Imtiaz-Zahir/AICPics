"use client";
import React from "react";

export default function Prompt({ prompt }: { prompt: string }) {
  const [copyStatus, setCopyStatus] = React.useState("copy");

  function copyToClipboard() {
    navigator.clipboard.writeText(prompt);
    setCopyStatus("copied");
    setTimeout(() => {
      setCopyStatus("copy");
    }, 3000);
  }
  return (
    <div className="mt-5 gap-2 border rounded">
      <div className="flex items-center justify-between border-b">
        <p className="font-semibold pl-5 py-2">Prompt :</p>
        <button
          type="button"
          className="border-l px-3"
          onClick={copyToClipboard}
        >
          {copyStatus}
        </button>
      </div>
        <h1 className="pl-5 py-2">{prompt}</h1>
    </div>
  );
}
