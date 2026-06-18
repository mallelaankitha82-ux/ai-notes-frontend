import { useState } from "react";
import Login from "./pages/Login";
import GenerateNote from "./pages/GenerateNote";
import MyNotes from "./pages/MyNotes";

function App() {
  const [page, setPage] = useState("generate");

  const token = localStorage.getItem("token");

  if (!token) {
    return <Login />;
  }

  return (
    <div>
      <h1>AI Notes Generator</h1>

      <button onClick={() => setPage("generate")}>
        Generate Notes
      </button>

      <button onClick={() => setPage("notes")}>
        My Notes
      </button>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
      >
        Logout
      </button>

      <hr />

      {page === "generate" && <GenerateNote />}
      {page === "notes" && <MyNotes />}
    </div>
  );
}

export default App;