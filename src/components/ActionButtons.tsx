import { invoke } from
"@tauri-apps/api/core";

type Props = {

  type: string;

  content: string;
};

function ActionButtons({

  type,

  content,

}: Props) {

  return (

    <div
      className="
        flex
        gap-2
        mt-3
        flex-wrap
      "
    >

      {

        (
          type === "Url"
          || type === "GithubUrl"
        ) && (

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
            "
          >

            Open

          </button>
        )
      }

      {

        type === "GithubUrl"
        && (

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
            "
          >

            Clone Repo

          </button>
        )
      }

    </div>
  );
}

export default ActionButtons;