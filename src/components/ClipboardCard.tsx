import TypeBadge from "./TypeBadge";
import ActionButtons from "./ActionButtons";

type Props = {

  content: string;

  content_type: string;
};

function ClipboardCard({

  content,

  content_type,

}: Props) {

  return (

    <div
      className="
        bg-slate-800
        border border-slate-700
        rounded-xl
        p-4
        mb-3
        shadow
      "
    >

      <div
        className="
          flex
          justify-between
          items-center
          mb-3
        "
      >

        <TypeBadge
          type={content_type}
        />

      </div>

      <pre
        className="
        text-sm
        whitespace-pre-wrap
        break-all
        font-mono
        overflow-x-auto
      "
     >

  {content}

</pre>

<ActionButtons
  type={content_type}
  content={content}
/>

    </div>
  );
}

export default ClipboardCard;