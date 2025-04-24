"use client";
import { useState, useRef, useEffect } from "react";

export default function ChatInterface() {
  const [messages, setMessages] = useState([{ role: "bot", text: "Salut ! Pose-moi ta question patrimoniale." }]);
  const [input, setInput] = useState("");
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text }),
      });
      const { response } = await res.json();
      setMessages(prev => [...prev, { role: "bot", text: response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "bot", text: "Désolé, une erreur est survenue côté IA." }]);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto border rounded-xl overflow-hidden shadow-lg">
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={\`max-w-[80%] px-4 py-2 rounded-2xl \${m.role === "bot" ? "bg-gray-200 self-start text-gray-800" : "bg-blue-600 text-white self-end"}\`}
          >
            {m.text}
          </div>
        ))}
        <div ref={scrollRef} />
      </div>
      <div className="flex items-center p-4 bg-white border-t">
        <input
          className="flex-1 px-4 py-2 mr-2 border rounded-full focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Écris ta question…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}