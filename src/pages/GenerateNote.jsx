import { useState } from "react";
import api from "../services/api";

export default function GenerateNote() {
  const [topic, setTopic] = useState("");
  const [wordLimit, setWordLimit] = useState(300);
  const [language, setLanguage] = useState("English");

  const generate = async () => {
    try {
      const res = await api.post("/notes/generate", {
        topic,
        word_limit: Number(wordLimit),
        language,
      });

      alert("Note Generated Successfully");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to generate note");
    }
  };

  return (
    <div>
      <h2>Generate Note</h2>

      <input
        type="text"
        placeholder="Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        value={wordLimit}
        onChange={(e) => setWordLimit(e.target.value)}
      />

      <br /><br />

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option>English</option>
        <option>Telugu</option>
        <option>Hindi</option>
      </select>

      <br /><br />

      <button onClick={generate}>
        Generate
      </button>
    </div>
  );
}