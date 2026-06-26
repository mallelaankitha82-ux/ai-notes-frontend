import { useState } from "react";
import api from "../services/api";

export default function AskPdf() {

  const [pdfText, setPdfText] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askQuestion = async () => {

    if (!pdfText || !question) {
      alert("Enter PDF text and question");
      return;
    }

    try {

      const res = await api.post("/pdf/ask", {
        pdf_text: pdfText,
        question: question,
      });

      setAnswer(res.data.answer);

    } catch (err) {
      console.log(err);
      alert("Failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2>Ask Questions from PDF</h2>

      <textarea
        rows="10"
        cols="80"
        placeholder="Paste PDF Text"
        value={pdfText}
        onChange={(e)=>setPdfText(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Ask your question"
        value={question}
        onChange={(e)=>setQuestion(e.target.value)}
      />

      <br /><br />

      <button onClick={askQuestion}>
        Ask
      </button>

      <br /><br />

      <h3>Answer</h3>

      <p>{answer}</p>

    </div>
  );
}