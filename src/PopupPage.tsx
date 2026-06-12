import { useEffect, useState }
from "react";

import {
  listen,
  emit,
} from "@tauri-apps/api/event";

import { invoke }
from "@tauri-apps/api/core";

type PopupPayload = {

  content: string;

  type: string;
};

function PopupPage() {

  const [content, setContent]
    = useState("");

  const [type, setType]
    = useState("");

  const [visible, setVisible]
    = useState(false);

  useEffect(() => {

    let hideTimer: number;

    let removeTimer: number;

    const unlisten = listen<PopupPayload>(

      "clipboard-popup",

      async (event) => {

        // Clear old timers
        clearTimeout(hideTimer);

        clearTimeout(removeTimer);

        // Update content
        setContent(
          event.payload.content
        );

        setType(
          event.payload.type
        );

        // Restart animation
        setVisible(false);

        requestAnimationFrame(() => {

          setVisible(true);
        });

        // START 5 SECOND TIMER
        hideTimer = window.setTimeout(() => {

          // Fade out
          setVisible(false);

          // Wait for animation to finish
          removeTimer = window.setTimeout(

            async () => {

              await emit(
                "hide-popup"
              );

            },

            200
          );

        }, 5000);
      }
    );

    return () => {

      clearTimeout(hideTimer);

      clearTimeout(removeTimer);

      unlisten.then((fn) => fn());
    };

  }, []);

  const truncated =

    content.length > 45

      ? content.slice(0, 45) + "..."

      : content;

  return (

    <div
      className="
        h-screen

        bg-transparent

        flex
        items-center
        justify-center

        overflow-hidden

        pointer-events-none
      "
    >

      <div

        className={`

          w-85

          pointer-events-auto

          bg-slate-900/95

          backdrop-blur-md

          text-white

          rounded-2xl

          border
          border-slate-700/70

          shadow-2xl

          p-4

          transition-all
          duration-200

          ${visible

            ? "opacity-100 translate-y-0 scale-100"

            : "opacity-0 translate-y-2 scale-95"
          }
        `}
      >

        {/* Type */}
        <div
          className="
            text-xs
            text-slate-400
            mb-2
          "
        >

          {type}

        </div>

        {/* Content */}
        <div
          className="
            text-sm
            break-all
            mb-4
          "
        >

          {truncated}

        </div>

        {/* Actions */}
        <div
          className="
            flex
            gap-2
            flex-wrap
          "
        >

          {(type === "Url"
            || type === "GithubUrl") && (

            <button

              onClick={() =>
                invoke(
                  "open_url",
                  { url: content }
                )
              }

              className="
                bg-blue-600
                hover:bg-blue-700

                px-3
                py-1

                rounded-lg

                text-sm

                transition-all
              "
            >

              Open

            </button>
          )}

          {type === "GithubUrl" && (

            <button

              onClick={() =>
                invoke(
                  "clone_repo",
                  { url: content }
                )
              }

              className="
                bg-green-600
                hover:bg-green-700

                px-3
                py-1

                rounded-lg

                text-sm

                transition-all
              "
            >

              Clone Repo

            </button>
          )}

        </div>

      </div>

    </div>
  );
}

export default PopupPage;