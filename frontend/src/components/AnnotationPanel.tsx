type Annotation = {
  id: string;
  body: string;
};

export default function AnnotationPanel({
  annotations,
}: {
  annotations: Annotation[];
}) {
  return (
    <aside
      className="w-80 border-l p-4 bg-gray-50 h-full overflow-y-auto"
      aria-label="Annotation panel"
    >
      <h2 className="font-bold mb-4">Annotations</h2>

      {annotations.length === 0 && (
        <p className="text-gray-500">No annotations selected.</p>
      )}

      {annotations.map((a) => (
        <article
          key={a.id}
          className="mb-3 p-3 bg-white shadow rounded border border-gray-200"
        >
          <p className="text-gray-800 leading-relaxed">{a.body}</p>
        </article>
      ))}
    </aside>
  );
}