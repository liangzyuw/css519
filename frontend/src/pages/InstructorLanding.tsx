import { useEffect, useState } from "react";
import { getTextbooks } from "../api/api";

type Textbook = {
  id: string;
  title: string;
  author: string;
};

interface InstructorLandingProps {
  onSelectTextbook: (textbookId: string) => void;
  onReviewComments: () => void;
  onLogout: () => void;
}

export default function InstructorLanding({
  onSelectTextbook,
  onReviewComments,
  onLogout,
}: InstructorLandingProps) {
  const [textbooks, setTextbooks] = useState<Textbook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTextbooks();
  }, []);

  const loadTextbooks = async () => {
    try {
      const data = await getTextbooks();
      setTextbooks(data);
    } catch (err) {
      console.error("Failed to load textbooks:", err);
      setTextbooks([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            CoffeeJelly Instructor Console
          </h1>
          <p className="text-sm text-gray-500">
            Review student requests and manage instructional support.
          </p>
        </div>

        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
        >
          Log Out
        </button>
      </header>

      <main className="p-8 space-y-8">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={onReviewComments}
            className="text-left bg-purple-50 border border-purple-200 rounded-lg shadow-sm p-6 hover:shadow-md hover:border-purple-400 transition"
          >
            <h2 className="text-xl font-bold text-purple-900 mb-2">
              Review Student Comment Requests
            </h2>
            <p className="text-sm text-purple-800 mb-4">
              View student-submitted clarification requests and compare them
              with existing instructor annotations.
            </p>
            <span className="text-purple-700 font-semibold">
              Open review queue →
            </span>
          </button>
{/* 
          <div className="bg-white border rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Instructor Tools
            </h2>
            <p className="text-sm text-gray-600">
              Future instructor features can include annotation creation,
              assignment controls, and student activity summaries.
            </p>
          </div> */}
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Open Textbook Viewer</h2>

          {loading && <p className="text-gray-500">Loading textbooks...</p>}

          {!loading && textbooks.length === 0 && (
            <p className="text-gray-500">No textbooks available.</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {textbooks.map((textbook) => (
              <button
                key={textbook.id}
                onClick={() => onSelectTextbook(textbook.id)}
                className="text-left bg-white border rounded-lg shadow-sm p-6 hover:shadow-md hover:border-blue-400 transition"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {textbook.title}
                </h3>

                <p className="text-sm text-gray-500 mb-4">
                  Author: {textbook.author}
                </p>

                <span className="text-blue-600 font-medium">
                  Open textbook →
                </span>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}