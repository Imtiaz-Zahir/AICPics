"use client";
import React, { useState } from "react";
import contactActon from "@/actions/contactAction";

export default function Feedback() {
  const [email, setEmail] = useState("");
  const [message, setMassage] = useState("");

  async function saveFeedback(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !message) return alert("Please fill all the fields");
    const res = await contactActon(email, message);
    alert(res);
    if(res === "Feedback saved successfully!") {
      setEmail("");
      setMassage("");
    }
  }

  return (
    <div>
      <h3 className="text-lg font-semibold">Gave Your Opinion</h3>
      <form
        onSubmit={saveFeedback}
        className="flex flex-col gap-3 mt-5 text-black"
      >
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          name="email"
          required
          className="p-2 w-full rounded-md focus:outline-none"
        />
        <input
          type="text"
          value={message}
          onChange={(e) => setMassage(e.target.value)}
          placeholder="Message"
          name="message"
          required
          className="p-2 w-full rounded-md focus:outline-none"
        />
        <button
          type="submit"
          className="bg-gray-600 text-white p-2 rounded-md w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
