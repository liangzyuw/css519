export default function AnnotationMarker({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <span
      onClick={onClick}
      className="ml-1 cursor-pointer text-blue-500 font-bold"
    >
      ⓘ
    </span>
  );
}