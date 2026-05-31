import { useState } from "react";
import Login from "./pages/Login";
import TextbookLanding from "./pages/TextbookLanding";
import TextbookViewer from "./components/TextbookViewer";
import InstructorLanding from "./pages/InstructorLanding";
import InstructorReviewPage from "./pages/InstructorReviewPage";

type Page = "student-textbooks" | "instructor-home" | "viewer" | "review";

function App() {
  const storedUser = localStorage.getItem("user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const [user, setUser] = useState<any>(parsedUser);
  const [page, setPage] = useState<Page>(
    parsedUser?.role === "instructor" ? "instructor-home" : "student-textbooks"
  );

  const [selectedTextbookId, setSelectedTextbookId] = useState<string | null>(
    null
  );

  const handleLogin = () => {
    const updatedUser = localStorage.getItem("user");
    const parsed = updatedUser ? JSON.parse(updatedUser) : null;

    setUser(parsed);
    setIsAuthenticated(true);

    if (parsed?.role === "instructor") {
      setPage("instructor-home");
    } else {
      setPage("student-textbooks");
    }
  };

  // Logic to clear storage and update state
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setSelectedTextbookId(null);
    setPage("student-textbooks");
    setIsAuthenticated(false);// This triggers the re-render back to <Login />
  };

  const handleSelectTextbook = (textbookId: string) => {
    setSelectedTextbookId(textbookId);
    setPage("viewer");
  };

  const handleBackFromViewer = () => {
    setSelectedTextbookId(null);

    if (user?.role === "instructor") {
      setPage("instructor-home");
    } else {
      setPage("student-textbooks");
    }
  };

  // const handleBackToTextbooks = () => {
  //   setSelectedTextbookId(null);
  // };

  // 1. Auth check must come first
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  if (page === "instructor-home") {
    return (
      <InstructorLanding
        onSelectTextbook={handleSelectTextbook}
        onReviewComments={() => setPage("review")}
        onLogout={handleLogout}
      />
    );
  }

  if (page === "review") {
    return (
      <InstructorReviewPage
        onBack={() => setPage("instructor-home")}
        onLogout={handleLogout}
      />
    );
  }

  if (page === "viewer" && selectedTextbookId) {
    return (
      <TextbookViewer
        textbookId={selectedTextbookId}
        onBack={handleBackFromViewer}
        onLogout={handleLogout}
      />
    );
  }

  // 2. If authenticated but no textbook selected, show landing page
  // if (!selectedTextbookId) {
  //   return (
  //     <TextbookLanding
  //       onSelectTextbook={setSelectedTextbookId}
  //       onLogout={handleLogout}
  //     />
  //   );
  // }

  // 3. If authenticated and textbook selected, show viewer
  // pass the logout handler to textbook viewer as a prop so it can trigger logout when needed

  return (
    <TextbookLanding
      onSelectTextbook={handleSelectTextbook}
      // onBack={handleBackToTextbooks}
      onLogout={handleLogout}
    />
  );
}

export default App;