import { useEffect, useState } from "react";

import { invoke } from "@tauri-apps/api/core";

import { listen } from "@tauri-apps/api/event";

import ClipboardCard from "./components/ClipboardCard";

function App() {

  type ClipboardItem = {

  content: string;

  content_type: string;
};

const [history, setHistory]
  = useState<ClipboardItem[]>([]);

  const [search, setSearch] = useState("");

  async function loadHistory() {

    const result = await invoke<ClipboardItem[]>(
      "get_clipboard_history"
    );

    setHistory(result);
  }

  useEffect(() => {

    loadHistory();

    const unlisten = listen<string>(
      "clipboard-updated",
      (event) => {

        setHistory((prev) => [

        {
        content: event.payload,
        content_type: "Text",
        },
        ...prev
   ]);
      }
    );

    return () => {

      unlisten.then((fn) => fn());
    };

  }, []);

  const filtered = history.filter((item) =>
    item.content.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (

    <div
      className="
        h-screen
        bg-slate-900
        text-white
        flex
        flex-col
      "
    >

      <div
        className="
          p-4
          border-b
          border-slate-700
        "
      >

        <h1
          className="
            text-2xl
            font-bold
            mb-3
          "
        >
          ClipStack
        </h1>

        <input
          type="text"
          placeholder="Search clipboard..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }

          className="
            w-full
            p-3
            rounded-lg
            bg-slate-800
            border
            border-slate-700
            outline-none
          "
        />

      </div>

      <div
        className="
          flex-1
          overflow-y-auto
          p-4
        "
      >

        {

          filtered.map((item, index) => (

            <ClipboardCard
              key={index}
              content={item.content}
              content_type={item.content_type}

            />

          ))
        }

      </div>

    </div>
  );
}

export default App;