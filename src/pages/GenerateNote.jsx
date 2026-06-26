import { useState } from "react";
import api from "../services/api";

export default function GenerateNote() {
  const [topic, setTopic] = useState("");
  const [wordLimit, setWordLimit] = useState(300);
  const [language, setLanguage] = useState("English");
  const [loading, setLoading] = useState(false);

  const generate = async (e) => {
    e.preventDefault();

    if (!topic.trim()) {
      alert("Please enter a topic");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/notes/generate", {
        topic,
        word_limit: Number(wordLimit),
        language,
      });

      alert("Notes Generated Successfully");

      setTopic("");
      setWordLimit(300);
      setLanguage("English");

    } catch (err) {
      console.error(err);
      alert("Failed to generate notes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">

      <div
        className="card shadow-lg mx-auto"
        style={{ maxWidth: "700px" }}
      >
        <div className="card-body">

          <h2 className="text-center mb-4">
             Generate AI Notes
          </h2>

          <form onSubmit={generate}>

            <div className="mb-3">
              <label className="form-label">
                Topic
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter Topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Word Limit
              </label>

              <input
                type="number"
                className="form-control"
                value={wordLimit}
                onChange={(e) => setWordLimit(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="form-label">
                Language
              </label>

              <select
                className="form-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option>English</option>
                <option>Telugu</option>
                <option>Hindi</option>
              </select>
            </div>

            <button
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading
                ? "Generating..."
                : "Generate Notes"}
            </button>

          </form>

        </div>
      </div>

    </div>
  );
}