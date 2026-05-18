import { useState } from "react";
import Login from "./pages/Login";
import TextbookLanding from "./pages/TextbookLanding";
import TextbookViewer from "./components/TextbookViewer";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const [selectedTextbookId, setSelectedTextbookId] = useState<string | null>(
    null
  );

  const handleLogin = () => {
    setIsAuthenticated(true);
    setSelectedTextbookId(null);
  };

  // Logic to clear storage and update state
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setSelectedTextbookId(null);
    setIsAuthenticated(false); // This triggers the re-render back to <Login />
  };

  const handleBackToTextbooks = () => {
    setSelectedTextbookId(null);
  };

  // 1. Auth check must come first
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  // 2. If authenticated but no textbook selected, show landing page
  if (!selectedTextbookId) {
    return (
      <TextbookLanding
        onSelectTextbook={setSelectedTextbookId}
        onLogout={handleLogout}
      />
    );
  }

  // 3. If authenticated and textbook selected, show viewer
  // pass the logout handler to textbook viewer as a prop so it can trigger logout when needed
  return (
    <TextbookViewer
      textbookId={selectedTextbookId}
      onBack={handleBackToTextbooks}
      onLogout={handleLogout}
    />
  );
}

export default App;