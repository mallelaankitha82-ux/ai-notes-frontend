import { useState } from "react";
import api from "../services/api";

export default function UploadPDF() {
  const [file, setFile] = useState(null);
  const [language, setLanguage] = useState("English");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");

  const uploadPDF = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("language", language);

    try {
      setLoading(true);

      const res = await api.post("/pdf/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("PDF Uploaded Successfully");

      setSummary(res.data.generated_note);

    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.detail ||
        "Upload Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">

      <div
        className="card shadow-lg mx-auto"
        style={{ maxWidth: "800px" }}
      >
        <div className="card-body">

          <h2 className="text-center mb-4">
             Upload PDF
          </h2>

          <form onSubmit={uploadPDF}>

            <div className="mb-3">

              <label className="form-label">
                Choose PDF File
              </label>

              <input
                type="file"
                accept=".pdf"
                className="form-control"
                onChange={(e) =>
                  setFile(e.target.files[0])
                }
              />

            </div>

            <div className="mb-3">

              <label className="form-label">
                Language
              </label>

              <select
                className="form-select"
                value={language}
                onChange={(e) =>
                  setLanguage(e.target.value)
                }
              >
                <option>English</option>
                <option>Telugu</option>
                <option>Hindi</option>
              </select>

            </div>

            <button
              className="btn btn-warning w-100"
              disabled={loading}
            >
              {loading
                ? "Uploading..."
                : "Upload & Generate Summary"}
            </button>

          </form>

          {summary && (
            <div className="mt-5">

              <h4>AI Generated Notes & Summary</h4>

              <div
                className="border rounded p-3 mt-3"
                style={{
                  maxHeight: "400px",
                  overflowY: "auto",
                  whiteSpace: "pre-wrap",
                  backgroundColor: "#f8f9fa",
                }}
              >
                {summary}
              </div>

            </div>
          )}

        </div>
      </div>

    </div>
  );
}