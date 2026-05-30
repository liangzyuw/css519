import { useEffect, useState } from "react";
import {
  getSections,
  getAnnotations,
  getChaptersByTextbookId,
  getTextbookById,
  createComment,
  getComments,
} from "../api/api";

import StudentCommentMarker from "./StudentCommentMarker";
import AnnotationPanel from "./AnnotationPanel";
import AnnotationMarker from "./AnnotationMarker";

interface TextbookViewerProps {
  textbookId: string;
  onBack: () => void;
  onLogout: () => void;
}

type Textbook = {
  id: string;
  title: string;
  author: string;
};

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

type StudentComment = {
  id: string;
  content_id: string;
  content_type: string;
  author_id: string;
  body: string;
  created_at: string;
};

export default function TextbookViewer({ textbookId, onBack, onLogout }: TextbookViewerProps) {
  const [textbook, setTextbook] = useState<Textbook | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedAnnotations, setSelectedAnnotations] = useState<any[]>([]);
  const [selectedChapterId, setSelectedChapterId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [enhancedMarkers, setEnhancedMarkers] = useState(false);

  // states for comment functionality
  const [requestMode, setRequestMode] = useState(false);
  const [activeCommentSectionId, setActiveCommentSectionId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [commentsBySection, setCommentsBySection] = useState<Record<string, StudentComment[]>>({});

  useEffect(() => {
    loadTextbook();
    loadChapters();
  }, [textbookId]);

  useEffect(() => {
    if (selectedChapterId) {
      loadSections(selectedChapterId);
    }
  }, [selectedChapterId]);

  const loadTextbook = async () => {
    try {
      const data = await getTextbookById(textbookId);
      setTextbook(data);
    } catch (err) {
      console.error("Failed to load textbook:", err);
      setTextbook(null);
    }
  };

  const loadChapters = async () => {
    try {
      setLoading(true);
      setSelectedAnnotations([]);
      setSections([]);
      setSelectedChapterId("");

      const chapterData = await getChaptersByTextbookId(textbookId);

      setChapters(chapterData);

      if (chapterData.length > 0) {
        setSelectedChapterId(chapterData[0].id);
      }
    } catch (err) {
      console.error("Failed to load chapters:", err);
      setChapters([]);
    } finally {
      setLoading(false);
    }
  };

  const loadSections = async (chapterId: string) => {
    try {
      setLoading(true);
      setSelectedAnnotations([]);

      const sectionData = await getSections(chapterId);
      setSections(sectionData);

      await loadCommentsForSections(sectionData);
    } catch (err) {
      console.error("Failed to load chapter sections:", err);
      setSections([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkerClick = async (sectionId: string) => {
    console.log("Clicked section:", sectionId);

    const annotations = await getAnnotations(sectionId);

    console.log("Fetched annotations:", annotations);

    setSelectedAnnotations(annotations);
  };

  const getCurrentUserId = () => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      return "unknown_user";
    }

    try {
      const user = JSON.parse(storedUser);
      return user.id || "unknown_user";
    } catch {
      return "unknown_user";
    }
  };

  const loadCommentsForSections = async (sectionData: Section[]) => {
    const nextCommentsBySection: Record<string, StudentComment[]> = {};

    for (const section of sectionData) {
      const comments = await getComments(section.id);
      nextCommentsBySection[section.id] = comments;
    }

    setCommentsBySection(nextCommentsBySection);
  };

  const handleSectionClickForComment = (sectionId: string) => {
    if (!requestMode) return;

    setActiveCommentSectionId(sectionId);
    setCommentText("");
  };

  const handleSubmitComment = async () => {
    if (!activeCommentSectionId || commentText.trim() === "") {
      return;
    }

    const newComment = await createComment({
      content_id: activeCommentSectionId,
      content_type: "section",
      author_id: getCurrentUserId(),
      body: commentText.trim(),
    });

    setCommentsBySection((prev) => ({
      ...prev,
      [activeCommentSectionId]: [
        ...(prev[activeCommentSectionId] || []),
        newComment,
      ],
    }));

    setCommentText("");
    setActiveCommentSectionId(null);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-72 p-4 border-r border-gray-200 bg-white flex flex-col">
        <button
          onClick={onBack}
          className="text-left text-blue-600 hover:text-blue-800 mb-4"
        >
          ← Back to textbooks
        </button>

        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900">
            {textbook?.title || "Textbook"}
          </h2>
          {textbook && (
            <p className="text-sm text-gray-500">By {textbook.author}</p>
          )}
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 mb-2">
            Chapters
          </h3>

          {chapters.length === 0 && !loading && (
            <p className="text-sm text-gray-400">No chapters found.</p>
          )}

          <div className="space-y-2">
            {chapters.map((chapter) => (
              <button
                key={chapter.id}
                onClick={() => setSelectedChapterId(chapter.id)}
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

        <div className="mt-4 border-t pt-4">
          <button
            onClick={() => setEnhancedMarkers((prev) => !prev)}
            className={`w-full px-3 py-2 rounded text-left transition-colors ${
              enhancedMarkers
                ? "bg-yellow-300 text-black font-semibold border border-black"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
            aria-pressed={enhancedMarkers}
          >
            {enhancedMarkers ? "Enhanced markers: On" : "Enhanced markers: Off"}
          </button>

          <p className="text-xs text-gray-500 mt-2">
            Makes annotation markers larger and higher contrast.
          </p>
        </div>

        <div className="mt-4 border-t pt-4">
          <button
            onClick={() => {
              setRequestMode((prev) => !prev);
              setActiveCommentSectionId(null);
              setCommentText("");
            }}
            className={`w-full px-3 py-2 rounded text-left transition-colors ${
              requestMode
                ? "bg-purple-200 text-purple-900 font-semibold border border-purple-400"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
            aria-pressed={requestMode}
          >
            {requestMode ? "Request annotation mode: On" : "Request annotation mode: Off"}
          </button>

          <p className="text-xs text-gray-500 mt-2">
            Turn this on, then click a section to request instructor clarification.
          </p>
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
          <p className="text-gray-500">Loading textbook content...</p>
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
              onClick={() => handleSectionClickForComment(section.id)}
              className={`mb-8 bg-white p-6 rounded shadow-sm border ${
                requestMode
                  ? "cursor-crosshair hover:border-purple-400 hover:bg-purple-50"
                  : ""
              }`}
            >
              <h1 className="text-2xl font-bold mb-2">
                {section.title}
              </h1>

              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {section.content}

                <AnnotationMarker
                  onClick={(event?: any) => {
                    event?.stopPropagation?.();
                    handleMarkerClick(section.id);
                  }}
                  label={`View annotations for ${section.title}`}
                  enhanced={enhancedMarkers}
                />

                <StudentCommentMarker
                  comments={commentsBySection[section.id] || []}
                />
              </p>

              {activeCommentSectionId === section.id && (
                <div
                  className="mt-4 p-4 border border-purple-300 bg-purple-50 rounded"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="font-semibold text-purple-900 mb-2">
                    Request an instructor annotation
                  </h3>

                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full border rounded p-2 mb-3"
                    rows={3}
                    placeholder="Write what you want the instructor to clarify..."
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={handleSubmitComment}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
                    >
                      Submit Request
                    </button>

                    <button
                      onClick={() => {
                        setActiveCommentSectionId(null);
                        setCommentText("");
                      }}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>

      {/* Annotation Panel */}
      <AnnotationPanel annotations={selectedAnnotations} />
    </div>
  );
}