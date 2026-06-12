type Props = {

  content: string;

  type: string;
};

function Popup({

  content,

  type,

}: Props) {

  const truncated = content.length > 45
    ? content.slice(0, 45) + "..."
    : content;

  return (

    <div
      className="
        w-[340px]
        bg-slate-900
        text-white
        rounded-2xl
        border border-slate-700
        shadow-2xl
        p-4
      "
    >

      <div
        className="
          text-xs
          text-slate-400
          mb-2
        "
      >

        {type}

      </div>

      <div
        className="
          text-sm
          break-all
          mb-4
        "
      >

        {truncated}

      </div>

      <div
        className="
          flex
          gap-2
        "
      >

        {

          (
            type === "Url"
            || type === "GithubUrl"
          ) && (

            <button
              className="
                bg-blue-600
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
              className="
                bg-green-600
                px-3
                py-1
                rounded-lg
                text-sm
              "
            >

              Clone

            </button>
          )
        }

      </div>

    </div>
  );
}

export default Popup;