import { useEffect, useState } from "react";
import { getSections, getAnnotations, getChaptersByTextbookId } from "../api/api";
import AnnotationPanel from "./AnnotationPanel";
import AnnotationMarker from "./AnnotationMarker";

interface TextbookViewerProps {
  onLogout: () => void;
}

type Chapter = {
  id: string;
  textbook_id: string;
  title: string;
  order_index: number;
};

type Section = {
  id: string;
  chapter_id: string;
  title: string;
  content: string;
};

export default function TextbookViewer({ onLogout }: TextbookViewerProps) {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedAnnotations, setSelectedAnnotations] = useState<any[]>([]);
  const [selectedChapterId, setSelectedChapterId] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const textbookId = "tb1";

  useEffect(() => {
    loadChapters();
  }, []);

  useEffect(() => {
    if (selectedChapterId) {
      loadSections(selectedChapterId);
    }
  }, [selectedChapterId]);

  const loadChapters = async () => {
    try {
      const chapterData = await getChaptersByTextbookId(textbookId);

      setChapters(chapterData);

      if (chapterData.length > 0) {
        setSelectedChapterId(chapterData[0].id);
      }
    } catch (err) {
      console.error("Failed to load chapters:", err);
      setChapters([]);
    }
  };

  const loadSections = async (chapterId: string) => {
    try {
      setLoading(true);
      setSelectedAnnotations([]);

      const sectionData = await getSections(chapterId);
      setSections(sectionData);
    } catch (err) {
      console.error("Failed to load chapter sections:", err);
      setSections([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChapterChange = (chapterId: string) => {
    setSelectedChapterId(chapterId);
  };

  const handleMarkerClick = async (sectionId: string) => {
    console.log("Clicked section:", sectionId);

    const annotations = await getAnnotations(sectionId);

    console.log("Fetched annotations:", annotations);

    setSelectedAnnotations(annotations);
  };

  // const handleLogOut = () => {
  //   onLogout();
  // }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-64 p-4 border-r border-gray-200 bg-white flex flex-col">
        <h2 className="text-lg font-bold mb-4">Product</h2>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 mb-2">
            Chapters
          </h3>

          {chapters.length === 0 && (
            <p className="text-sm text-gray-400">No chapters found.</p>
          )}

          <div className="space-y-2">
            {chapters.map((chapter) => (
              <button
                key={chapter.id}
                onClick={() => handleChapterChange(chapter.id)}
                className={`w-full text-left px-3 py-2 rounded transition-colors ${
                  selectedChapterId === chapter.id
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {chapter.title}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onLogout}
          className="mt-auto bg-red-500 hover:bg-red-600 text-white p-2 rounded transition-colors"
        >
          Log Out
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {loading && (
          <p className="text-gray-500">Loading chapter content...</p>
        )}

        {!loading && sections.length === 0 && (
          <p className="text-gray-500">
            No sections found for this chapter.
          </p>
        )}

        {!loading &&
          sections.map((section) => (
            <div
              key={section.id}
              className="mb-8 bg-white p-6 rounded shadow-sm border"
            >
              <h1 className="text-2xl font-bold mb-2">
                {section.title}
              </h1>

              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {section.content}
                <AnnotationMarker
                  onClick={() => handleMarkerClick(section.id)}
                />
              </p>
            </div>
          ))}
      </div>

      {/* Annotation Panel */}
      <AnnotationPanel annotations={selectedAnnotations} />
    </div>
  );
}