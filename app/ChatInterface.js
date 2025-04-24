"use client";
import { useState } from "react";

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Salut ! Pose-moi ta question patrimoniale." }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMsg.text })
    });
    const { response } = await res.json();
    setMessages((m) => [...m, { role: "bot", text: response }]);
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg max-w-[80%] ${
              m.role === "bot"
                ? "bg-white self-start"
                : "bg-blue-600 text-white self-end ml-auto"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 p-3 border rounded-lg"
          placeholder="Écris ta question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="px-4 py-3 bg-blue-600 text-white rounded-lg"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}