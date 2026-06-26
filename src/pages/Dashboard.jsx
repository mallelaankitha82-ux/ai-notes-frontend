import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GenerateNote from "./pages/GenerateNote";
import MyNotes from "./pages/MyNotes";
import UploadPDF from "./pages/UploadPDF";

function App() {
  const [page, setPage] = useState("login");

  const token = localStorage.getItem("token");

  // Login / Register Screen
  if (!token) {
    return (
      <div className="container mt-5">

        <div className="text-center mb-4">
          <h1>AI Notes Generator</h1>
          <p className="text-muted">
            AI Powered Notes Generation System
          </p>
        </div>

        <div className="text-center mb-4">
          <button
            className={`btn ${
              page === "login"
                ? "btn-primary"
                : "btn-outline-primary"
            } me-2`}
            onClick={() => setPage("login")}
          >
            Login
          </button>

          <button
            className={`btn ${
              page === "register"
                ? "btn-success"
                : "btn-outline-success"
            }`}
            onClick={() => setPage("register")}
          >
            Register
          </button>
        </div>

        <div className="card shadow p-4">
          {page === "login" && <Login />}
          {page === "register" && <Register />}
        </div>

      </div>
    );
  }

  // Dashboard
  return (
    <div className="container mt-4">

      <div className="text-center mb-4">
        <h1> AI Notes Generator</h1>
        <h5 className="text-secondary">
          Welcome to your Dashboard
        </h5>
      </div>

      <div className="row g-3 mb-4">

        <div className="col-md-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h1>📝</h1>
              <h5>Generate Notes</h5>

              <button
                className="btn btn-primary mt-2"
                onClick={() => setPage("generate")}
              >
                Open
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h1>📚</h1>
              <h5>My Notes</h5>

              <button
                className="btn btn-success mt-2"
                onClick={() => setPage("notes")}
              >
                Open
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h1>📄</h1>
              <h5>Upload PDF</h5>

              <button
                className="btn btn-warning mt-2"
                onClick={() => setPage("upload")}
              >
                Open
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h1>🚪</h1>
              <h5>Logout</h5>

              <button
                className="btn btn-danger mt-2"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>

      </div>

      <hr />

      {page === "generate" && <GenerateNote />}
      {page === "notes" && <MyNotes />}
      {page === "upload" && <UploadPDF />}

    </div>
  );
}

export default App;