import { useEffect, useState } from "react";
import { getTextbooks } from "../api/api";

type Textbook = {
  id: string;
  title: string;
  author: string;
};

interface TextbookLandingProps {
  onSelectTextbook: (textbookId: string) => void;
  onLogout: () => void;
}

export default function TextbookLanding({
  onSelectTextbook,
  onLogout,
}: TextbookLandingProps) {
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
          <h1 className="text-2xl font-bold text-gray-900">CoffeeJelly</h1>
          <p className="text-sm text-gray-500">
            Select a textbook to begin.
          </p>
        </div>

        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
        >
          Log Out
        </button>
      </header>

      <main className="p-8">
        <h2 className="text-xl font-semibold mb-4">Available Textbooks</h2>

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
      </main>
    </div>
  );
}