export default function Home() {
  return (
    <main className="h-screen bg-zinc-950 text-white flex flex-col">

      {/* Header */}
      <div className="border-b border-zinc-800 p-4">
        <h1 className="text-2xl font-bold">
          Minecraft Addon Studio
        </h1>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">

        {/* File Tree */}
        <div className="w-72 border-r border-zinc-800 p-4 overflow-y-auto">

          <h2 className="font-bold mb-4">
            Project Files
          </h2>

          <div className="space-y-2 text-sm">

            <div>📁 BP</div>

            <div className="ml-4">
              manifest.json
            </div>

            <div className="ml-4">
              items
            </div>

            <div className="ml-4">
              recipes
            </div>

            <div className="mt-4">
              📁 RP
            </div>

            <div className="ml-4">
              manifest.json
            </div>

            <div className="ml-4">
              textures
            </div>

          </div>

        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">

          <div className="flex-1 overflow-y-auto p-4">

            <div className="bg-zinc-900 rounded-lg p-4">
              Welcome to Minecraft Addon Studio
            </div>

          </div>

          <div className="border-t border-zinc-800 p-4">

            <textarea
              className="w-full rounded-lg bg-zinc-900 p-3"
              rows={4}
              placeholder="Create a Ruby Ore addon..."
            />

            <button
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