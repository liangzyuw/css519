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
    <div className="w-80 border-l p-4 bg-gray-50 h-full overflow-y-auto">
      <h2 className="font-bold mb-4">Annotations</h2>

      {annotations.length === 0 && <p>No annotations</p>}

      {annotations.map((a) => (
        <div key={a.id} className="mb-3 p-2 bg-white shadow rounded">
          {a.body}
        </div>
      ))}
    </div>
  );
}