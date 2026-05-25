type Textbook = {
  id: string;
  title: string;
  author: string;
  copyright?: string;
  license?: string;
  rights?: string;
};

interface TextbookRightsPageProps {
  textbooks: Textbook[];
  onBack: () => void;
}

export default function TextbookRightsPage({
  textbooks,
  onBack,
}: TextbookRightsPageProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Textbook Licensing & Rights
          </h1>
          <p className="text-sm text-gray-500">
            Copyright and usage information for available textbooks.
          </p>
        </div>

        <button
          onClick={onBack}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
        >
          Back to Textbooks
        </button>
      </header>

      <main className="p-8">
        <div className="space-y-6">
          {textbooks.map((textbook) => (
            <section
              key={textbook.id}
              className="bg-white border rounded-lg shadow-sm p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {textbook.title}
              </h2>

              <p className="text-sm text-gray-500 mb-4">
                Author: {textbook.author}
              </p>

              <div className="space-y-3 text-gray-700">
                <div>
                  <h3 className="font-semibold text-gray-900">Copyright</h3>
                  <p>
                    {textbook.copyright ||
                      "Copyright information is not available."}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">License</h3>
                  <p>
                    {textbook.license ||
                      "License information is not available."}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">Rights</h3>
                  <p>
                    {textbook.rights ||
                      "Rights information is not available."}
                  </p>
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}