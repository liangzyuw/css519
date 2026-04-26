import TextbookViewer from "./components/TextbookViewer";
import { useState } from "react";
import Login from "./pages/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  // Logic to clear storage and update state
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false); // This triggers the re-render back to <Login />
  };

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  // return <TextbookViewer />;
  // pass the logout handler to textbook viewer as a prop so it can trigger logout when needed
  return <TextbookViewer onLogout={handleLogout} />;
}

export default App;