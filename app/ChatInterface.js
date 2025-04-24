"use client";
import { useState } from "react";

export default function ChatInterface() {
  const [messages, setMessages] = useState([{ role: "bot", text: "Salut ! Pose-moi ta question patrimoniale." }]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMsg.text }),
    });
    const { response } = await res.json();
    setMessages((prev) => [...prev, { role: "bot", text: response }]);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white shadow-inner">
        {messages.map((m, i) => (
          <div key={i} className={`max-w-[80%] p-4 rounded-lg ${m.role === "bot" ? "bg-gray-100 self-start" : "bg-blue-600 text-white self-end ml-auto"}`}>
            {m.text}
          </div>
        ))}
      </div>
      <div className="p-4 bg-gray-200 flex gap-4">
        <input
          className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none"
          placeholder="Écris ta question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
          Envoyer
        </button>
      </div>
    </div>
  );
}