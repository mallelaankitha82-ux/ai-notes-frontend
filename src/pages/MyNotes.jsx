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
      console.log(response.data);

      setNotes(response.data.notes || []);
    } catch (error) {
      console.error("Fetch Notes Error:", error);
      alert("Failed to load notes");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Notes</h1>

      {notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        notes.map((note) => (
          <div
            key={note.note_id}
            style={{
              border: "1px solid #ccc",
              marginBottom: "10px",
              padding: "10px",
            }}
          >
            <h3>{note.topic}</h3>
            <p>{note.generated_note}</p>
          </div>
        ))
      )}
    </div>
  );
}