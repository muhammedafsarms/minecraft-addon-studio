"use client";

import { useState } from "react";

export default function Home() {

  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);

  async function generateAddon() {

    if (!prompt) return;

    const userMessage = {
      role: "user",
      content: prompt
    };

    setMessages(prev => [...prev, userMessage]);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt
      })
    });

    const data = await response.json();

    if (data.success) {

      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: data.response
        }
      ]);

    }

    setPrompt("");
  }

  return (
    <main className="h-screen bg-zinc-950 text-white flex flex-col">

      <div className="border-b border-zinc-800 p-4">
        <h1 className="text-2xl font-bold">
          Minecraft Addon Studio
        </h1>
      </div>

      <div className="flex flex-1">

        <div className="w-72 border-r border-zinc-800 p-4">
          <h2 className="font-bold">
            Project Files
          </h2>
        </div>

        <div className="flex-1 flex flex-col">

          <div className="flex-1 overflow-y-auto p-4">

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 p-4 rounded-lg ${
                  msg.role === "user"
                    ? "bg-green-700"
                    : "bg-zinc-900"
                }`}
              >
                {msg.content}
              </div>
            ))}

          </div>

          <div className="border-t border-zinc-800 p-4">

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full rounded-lg bg-zinc-900 p-3"
              rows={4}
              placeholder="Create a Ruby Ore addon..."
            />

            <button
              onClick={generateAddon}
              className="mt-3 bg-green-600 px-5 py-2 rounded-lg"
            >
              Generate Addon
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}