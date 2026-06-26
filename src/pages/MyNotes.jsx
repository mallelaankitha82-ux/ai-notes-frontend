import { useEffect, useState } from "react";
import api from "../services/api";

export default function MyNotes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await api.get("/notes");
      setNotes(response.data.notes || []);
    } catch (error) {
      console.error(error);
      alert("Failed to load notes");
    }
  };

  const deleteNote = async (noteId) => {
    if (!window.confirm("Delete this note?")) return;

    try {
      await api.delete(`/notes/${noteId}`);

      setNotes(notes.filter((note) => note.note_id !== noteId));

      alert("Note deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  const downloadPdf = async (noteId) => {
    try {
      const response = await api.get(
        `/notes/download/${noteId}?format=pdf`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");
      link.href = url;
      link.download = `note_${noteId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("PDF Download Failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">
        My Notes
      </h2>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Search notes..."
          onChange={(e) => {
            const keyword = e.target.value.toLowerCase();

            if (keyword === "") {
              fetchNotes();
              return;
            }

            setNotes(
              notes.filter(
                (note) =>
                  note.topic.toLowerCase().includes(keyword) ||
                  note.generated_note
                    .toLowerCase()
                    .includes(keyword)
              )
            );
          }}
        />
      </div>

      {notes.length === 0 ? (
        <div className="alert alert-info text-center">
          No Notes Found
        </div>
      ) : (
        notes.map((note) => (
          <div
            key={note.note_id}
            className="card shadow mb-4"
          >
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h4>{note.topic}</h4>

                <span className="badge bg-primary">
                  {note.language}
                </span>
              </div>

              <div className="mb-3">
                <span className="badge bg-success me-2">
                  {note.source}
                </span>

                <span className="badge bg-secondary">
                  #{note.note_id}
                </span>
              </div>

              <div
                style={{
                  maxHeight: "250px",
                  overflowY: "auto",
                  whiteSpace: "pre-wrap",
                  background: "#f8f9fa",
                  padding: "15px",
                  borderRadius: "8px",
                }}
              >
                {note.generated_note}
              </div>

              <div className="mt-3">
                <button
                  className="btn btn-danger me-2"
                  onClick={() => deleteNote(note.note_id)}
                >
                  Delete
                </button>

                <button
                  className="btn btn-success"
                  onClick={() => downloadPdf(note.note_id)}
                >
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}