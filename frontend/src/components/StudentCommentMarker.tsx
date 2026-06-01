type StudentComment = {
  id: string;
  body: string;
  author_id: string;
  created_at: string;
};

export default function StudentCommentMarker({
  comments,
}: {
  comments: StudentComment[];
}) {
  if (comments.length === 0) return null;

  return (
    <div className="inline-block relative group ml-2">
      <button
        type="button"
        aria-label="View student annotation requests"
        className="
          inline-flex items-center justify-center
          h-8 w-8 rounded-full
          bg-purple-100 text-purple-700
          border border-purple-300
          font-bold text-sm
          hover:bg-purple-200
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
        "
      >
        ?
      </button>

      <div
        className="
          hidden group-hover:block group-focus-within:block
          absolute z-20 right-0 mt-2 w-72
          bg-white border border-gray-200 rounded shadow-lg p-3
        "
      >
        <h4 className="font-semibold text-gray-900 mb-2">
          Student Requests
        </h4>

        <div className="space-y-2">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="text-sm text-gray-700 border-b last:border-b-0 pb-2"
            >
              <p>{comment.body}</p>
              <p className="text-xs text-gray-400 mt-1">
                Student ID: {comment.author_id}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}