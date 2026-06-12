type Props = {
  type: string;
};

function TypeBadge({ type }: Props) {

  return (

    <span
      className="
        text-xs
        px-2
        py-1
        rounded-full
        bg-blue-600
        text-white
      "
    >

      {type}

    </span>
  );
}

export default TypeBadge;