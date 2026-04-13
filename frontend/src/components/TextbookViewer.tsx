import { useEffect, useState } from "react";
import { getSections, getAnnotations } from "../api/api";
import AnnotationPanel from "./AnnotationPanel";
import AnnotationMarker from "./AnnotationMarker";

export default function TextbookViewer() {
  const [sections, setSections] = useState<any[]>([]);
  const [selectedAnnotations, setSelectedAnnotations] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const sectionData = await getSections("ch1");
    setSections(sectionData);
  };

    const handleMarkerClick = async (sectionId: string) => {
        console.log("Clicked section:", sectionId);

        const annotations = await getAnnotations(sectionId);

        console.log("Fetched annotations:", annotations);

        setSelectedAnnotations(annotations);
    };

  return (
    <div className="flex h-screen">
      {/* Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {sections.map((section) => (
          <div key={section.id} className="mb-8">
            <h1 className="text-2xl font-bold mb-2">
              {section.title}
            </h1>

            <p className="text-gray-700 leading-relaxed">
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