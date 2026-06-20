"use client";

import { useState } from "react";
import JSZip from "jszip";

export default function Home() {
const [prompt, setPrompt] = useState("");
const [messages, setMessages] = useState([]);
const [loading, setLoading] = useState(false);

const [files, setFiles] = useState([]);
const [selectedFile, setSelectedFile] = useState(null);

async function generateAddon() {
if (!prompt.trim()) return;

const userPrompt = prompt;

setMessages((prev) => [
  ...prev,
  {
    role: "user",
    content: userPrompt,
  },
]);

setPrompt("");
setLoading(true);

try {
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: userPrompt,
    }),
  });

  const data = await response.json();

  if (data.success) {
    try {
      const parsed = JSON.parse(data.response);

      if (parsed.files) {
        setFiles(parsed.files);

        if (parsed.files.length > 0) {
          setSelectedFile(parsed.files[0]);
        }

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `Generated ${parsed.files.length} files.`,
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.response,
        },
      ]);
    }
  } else {
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "Error: " + data.error,
      },
    ]);
  }
} catch (error) {
  setMessages((prev) => [
    ...prev,
    {
      role: "assistant",
      content: "Failed: " + error.message,
    },
  ]);
}

setLoading(false);

}

async function downloadAddon() {
if (files.length === 0) {
alert("Generate an addon first");
return;
}

const zip = new JSZip();

files.forEach((file) => {
  zip.file(file.path, file.content);
});

const blob = await zip.generateAsync({
  type: "blob",
});

const url = URL.createObjectURL(blob);

const a = document.createElement("a");

a.href = url;
a.download = "GeneratedAddon.mcaddon";

document.body.appendChild(a);
a.click();
document.body.removeChild(a);

URL.revokeObjectURL(url);

}

return (
<main className="h-screen bg-zinc-950 text-white flex flex-col">

  {/* Header */}
  <div className="border-b border-zinc-800 p-4">
    <div className="flex justify-between items-center">

      <h1 className="text-2xl font-bold">
        Minecraft Addon Studio
      </h1>

      <button
        onClick={downloadAddon}
        className="bg-blue-600 px-4 py-2 rounded"
      >
        Download Addon
      </button>

    </div>
  </div>

  {/* Main Layout */}
  <div className="flex flex-1 overflow-hidden">

    {/* File Tree */}
    <div className="w-72 border-r border-zinc-800 overflow-y-auto">

      <div className="p-4">

        <h2 className="font-bold mb-4">
          Project Files
        </h2>

        {files.length === 0 ? (
          <div className="text-zinc-400 text-sm">
            No files generated yet
          </div>
        ) : (
          files.map((file, index) => (
            <div
              key={index}
              onClick={() => setSelectedFile(file)}
              className="
                p-2
                rounded
                cursor-pointer
                hover:bg-zinc-800
                mb-1
                text-sm
              "
            >
              📄 {file.path}
            </div>
          ))
        )}

      </div>

    </div>

    {/* Chat Panel */}
    <div className="flex-1 flex flex-col border-r border-zinc-800">

      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {messages.length === 0 && (
          <div className="bg-zinc-900 p-4 rounded-lg">
            Welcome to Minecraft Addon Studio
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg whitespace-pre-wrap ${
              msg.role === "user"
                ? "bg-green-700 ml-auto max-w-[80%]"
                : "bg-zinc-900 max-w-[90%]"
            }`}
          >
            {msg.content}
          </div>
        ))}

        {loading && (
          <div className="bg-zinc-900 p-4 rounded-lg">
            Generating addon...
          </div>
        )}

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
          disabled={loading}
          className="mt-3 bg-green-600 px-5 py-2 rounded-lg disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Addon"}
        </button>

      </div>

    </div>

    {/* File Viewer */}
    <div className="w-80 overflow-y-auto">

      <div className="p-4">

        <h2 className="font-bold mb-4">
          File Viewer
        </h2>

        {selectedFile ? (
          <>
            <div className="mb-3 text-sm text-green-400">
              {selectedFile.path}
            </div>

            <pre className="bg-zinc-900 p-4 rounded-lg text-xs whitespace-pre-wrap">
              {selectedFile.content}
            </pre>
          </>
        ) : (
          <div className="text-zinc-400">
            Select a file
          </div>
        )}

      </div>

    </div>

  </div>

</main>

);
}