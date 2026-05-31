import { useEffect, useState } from "react";
import { getAllAnnotations, getAllComments } from "../api/api";

type StudentComment = {
  id: string;
  content_id: string;
  content_type: string;
  author_id: string;
  body: string;
  created_at: string;
};

type Annotation = {
  id: string;
  content_id: string;
  content_type: string;
  author_id?: string;
  body: string;
  visibility?: string;
  created_at?: string;
};

interface InstructorReviewPageProps {
  onBack: () => void;
  onLogout: () => void;
}

export default function InstructorReviewPage({
  onBack,
  onLogout,
}: InstructorReviewPageProps) {
  const [comments, setComments] = useState<StudentComment[]>([]);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviewData();
  }, []);

  const loadReviewData = async () => {
    try {
      const [commentData, annotationData] = await Promise.all([
        getAllComments(),
        getAllAnnotations(),
      ]);

      setComments(commentData);
      setAnnotations(annotationData);
    } catch (err) {
      console.error("Failed to load instructor review data:", err);
      setComments([]);
      setAnnotations([]);
    } finally {
      setLoading(false);
    }
  };

  const getAnnotationsForContent = (contentId: string) => {
    return annotations.filter(
      (annotation) => annotation.content_id === contentId
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Student Comment Review
          </h1>
          <p className="text-sm text-gray-500">
            Review student requests and compare them with existing annotations.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
          >
            Back
          </button>

          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
          >
            Log Out
          </button>
        </div>
      </header>

      <main className="p-8">
        {loading && <p className="text-gray-500">Loading review data...</p>}

        {!loading && comments.length === 0 && (
          <div className="bg-white border rounded-lg p-6">
            <p className="text-gray-500">
              No student comments have been submitted yet.
            </p>
          </div>
        )}

        <div className="space-y-6">
          {comments.map((comment) => {
            const relatedAnnotations = getAnnotationsForContent(
              comment.content_id
            );

            return (
              <section
                key={comment.id}
                className="bg-white border rounded-lg shadow-sm p-6"
              >
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-gray-900">
                    Student Request
                  </h2>
                  <p className="text-sm text-gray-500">
                    Content ID: {comment.content_id} · Type:{" "}
                    {comment.content_type}
                  </p>
                  <p className="text-sm text-gray-500">
                    Student ID: {comment.author_id}
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded p-4 mb-4">
                  <h3 className="font-semibold text-purple-900 mb-1">
                    Student Comment
                  </h3>
                  <p className="text-purple-900">{comment.body}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Existing Instructor Annotations for This Content
                  </h3>

                  {relatedAnnotations.length === 0 && (
                    <p className="text-sm text-gray-500">
                      No instructor annotations currently exist for this
                      content.
                    </p>
                  )}

                  <div className="space-y-3">
                    {relatedAnnotations.map((annotation) => (
                      <div
                        key={annotation.id}
                        className="border border-blue-200 bg-blue-50 rounded p-3"
                      >
                        <p className="text-blue-900">{annotation.body}</p>
                        {annotation.visibility && (
                          <p className="text-xs text-blue-700 mt-1">
                            Visibility: {annotation.visibility}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}