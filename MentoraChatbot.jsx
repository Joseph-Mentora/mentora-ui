import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

export default function MentoraChatbot() {
  const [grade, setGrade] = useState("4");
  const [subject, setSubject] = useState("Math");
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendQuestion() {
    setLoading(true);
    const res = await fetch("https://mentora-backend.onrender.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ grade: parseInt(grade), subject, question }),
    });

    const data = await res.json();
    setResponse(data.answer || data.error || "No response received.");
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4 flex flex-col items-center text-center">
      <img src="/mentora-robot.png" alt="Mentora Robot" className="w-40 h-40 mb-4" />
      <h1 className="text-3xl font-bold text-blue-800 mb-4">Mentora AI Tutor</h1>
      <p className="text-blue-700 mb-6">Ask any question and get help instantly</p>

      <div className="grid grid-cols-1 gap-4 w-full max-w-md">
        <select
          className="rounded border p-2"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        >
          {[...Array(13).keys()].map((i) => (
            <option key={i} value={i}>{i === 0 ? "Kindergarten" : `Grade ${i}`}</option>
          ))}
        </select>

        <select
          className="rounded border p-2"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          {['Math', 'English', 'Science', 'History'].map((subj) => (
            <option key={subj} value={subj}>{subj}</option>
          ))}
        </select>

        <Textarea
          placeholder="Type your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="resize-none"
        />

        <Button onClick={sendQuestion} disabled={loading} className="bg-blue-700 hover:bg-blue-800">
          {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
          {loading ? "Thinking..." : "Ask Mentora"}
        </Button>
      </div>

      {response && (
        <Card className="mt-6 w-full max-w-md">
          <CardContent className="p-4 text-left text-blue-900 whitespace-pre-wrap">
            <strong>Answer:</strong>
            <p>{response}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
