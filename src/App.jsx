import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GenerateNote from "./pages/GenerateNote";
import MyNotes from "./pages/MyNotes";
import PdfUpload from "./pages/PdfUpload";
import AskPdf from "./pages/AskPdf";
function App() {
  const [page, setPage] = useState("login");

  const token = localStorage.getItem("token");

  // Login lekapothe
  if (!token) {
    return (
      <div>
        <h1>AI Notes Generator</h1>

        <button onClick={() => setPage("register")}>
          Register
        </button>

        <button onClick={() => setPage("login")}>
          Login
        </button>

        <hr />

        {page === "register" && <Register />}
        {page === "login" && <Login />}
      </div>
    );
  }

  // Login ayyaka
  return (
    <div>
      <h1>AI Notes Generator </h1>

      <button onClick={() => setPage("generate")}>
        Generate Notes
      </button>

      <button onClick={() => setPage("notes")}>
        My Notes
      </button>
      <button onClick={() => setPage("pdf")}>
       Upload PDF
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
      {page === "pdf" && <PdfUpload />}
      {page === "notes" && <MyNotes />}
      
    </div>
  );
}

export default App;