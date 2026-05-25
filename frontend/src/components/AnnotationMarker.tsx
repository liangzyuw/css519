export default function AnnotationMarker({
  onClick,
  label = "View annotation for this section",
  enhanced = false,
}: {
  onClick: () => void;
  label?: string;
  enhanced?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={
        enhanced
          ? `
            ml-3 inline-flex items-center justify-center
            h-11 w-11 rounded-full
            bg-yellow-300 text-black
            border-2 border-black
            font-bold text-2xl
            shadow-md
            hover:bg-yellow-400
            focus:outline-none focus:ring-4 focus:ring-yellow-500 focus:ring-offset-2
            transition-colors
          `
          : `
            ml-2 inline-flex items-center justify-center
            h-8 w-8 rounded-full
            bg-blue-100 text-blue-700
            border border-blue-300
            font-bold text-lg
            hover:bg-blue-200 hover:text-blue-900
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            transition-colors
          `
      }
    >
      <span aria-hidden="true">ⓘ</span>
    </button>
  );
}